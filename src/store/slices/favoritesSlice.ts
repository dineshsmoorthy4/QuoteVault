import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Favorite, FavoritesState } from '../../types';
import * as favoritesService from '../../services/favoritesService';

const initialState: FavoritesState = {
  favorites: [],
  isLoading: false,
  error: null,
};

export const fetchFavorites = createAsyncThunk(
  'favorites/fetch',
  async (userId: string, { rejectWithValue }) => {
    try {
      const favorites = await favoritesService.getFavorites(userId);
      return favorites;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch favorites');
    }
  }
);

export const addToFavorites = createAsyncThunk(
  'favorites/add',
  async ({ userId, quoteId }: { userId: string; quoteId: string }, { rejectWithValue }) => {
    try {
      const favorite = await favoritesService.addToFavorites(userId, quoteId);
      return favorite;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to add favorite');
    }
  }
);

export const removeFromFavorites = createAsyncThunk(
  'favorites/remove',
  async ({ userId, quoteId }: { userId: string; quoteId: string }, { rejectWithValue }) => {
    try {
      await favoritesService.removeFromFavorites(userId, quoteId);
      return quoteId;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to remove favorite');
    }
  }
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favorites = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(addToFavorites.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToFavorites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favorites.push(action.payload);
      })
      .addCase(addToFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(removeFromFavorites.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeFromFavorites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favorites = state.favorites.filter((f) => f.quoteId !== action.payload);
      })
      .addCase(removeFromFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = favoritesSlice.actions;
export default favoritesSlice.reducer;
