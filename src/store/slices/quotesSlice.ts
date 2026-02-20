import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Quote, QuotesState, QuoteCategory } from '../../types';
import * as quotesService from '../../services/quotesService';

const initialState: QuotesState = {
  quotes: [],
  filteredQuotes: [],
  selectedCategory: 'All',
  isLoading: false,
  error: null,
  currentPage: 1,
  hasMore: true,
  searchQuery: '',
};

export const fetchQuotes = createAsyncThunk(
  'quotes/fetchQuotes',
  async (
    { page, category, search }: { page: number; category?: QuoteCategory | 'All'; search?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await quotesService.fetchQuotes(page, category, search);
      console.log('Fetched quotes:', response);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch quotes');
    }
  }
);

export const fetchQuoteOfDay = createAsyncThunk(
  'quotes/fetchQuoteOfDay',
  async (_, { rejectWithValue }) => {
    try {
      const quote = await quotesService.getQuoteOfDay();
      return quote;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch quote of day');
    }
  }
);

const quotesSlice = createSlice({
  name: 'quotes',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<QuoteCategory | 'All'>) => {
      state.selectedCategory = action.payload;
      state.currentPage = 1;
      state.quotes = [];
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.currentPage = 1;
      state.quotes = [];
    },
    clearError: (state) => {
      state.error = null;
    },
    resetQuotes: (state) => {
      state.quotes = [];
      state.currentPage = 1;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuotes.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchQuotes.fulfilled, (state, action) => {
        state.isLoading = false;
        const { quotes, hasMore } = action.payload;
        if (state.currentPage === 1) {
          state.quotes = quotes;
        } else {
          state.quotes = [...state.quotes, ...quotes];
        }
        state.hasMore = hasMore;
        state.filteredQuotes = state.quotes;
      })
      .addCase(fetchQuotes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchQuoteOfDay.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchQuoteOfDay.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchQuoteOfDay.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCategory, setSearchQuery, clearError, resetQuotes } = quotesSlice.actions;
export default quotesSlice.reducer;
