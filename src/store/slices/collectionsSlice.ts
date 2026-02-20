import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Collection, CollectionQuote, CollectionsState } from '../../types';
import * as collectionsService from '../../services/collectionsService';

const initialState: CollectionsState = {
  collections: [],
  selectedCollection: null,
  collectionQuotes: [],
  isLoading: false,
  error: null,
};

export const fetchCollections = createAsyncThunk(
  'collections/fetch',
  async (userId: string, { rejectWithValue }) => {
    try {
      const collections = await collectionsService.getCollections(userId);
      console.log('Fetched collections:', collections);
      return collections;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch collections');
    }
  }
);

export const createCollection = createAsyncThunk(
  'collections/create',
  async (
    { userId, name, description }: { userId: string; name: string; description?: string },
    { rejectWithValue }
  ) => {
    try {
      const collection = await collectionsService.createCollection(userId, name, description);
      return collection;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to create collection');
    }
  }
);

export const deleteCollection = createAsyncThunk(
  'collections/delete',
  async (collectionId: string, { rejectWithValue }) => {
    try {
      await collectionsService.deleteCollection(collectionId);
      return collectionId;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to delete collection');
    }
  }
);

export const fetchCollectionQuotes = createAsyncThunk(
  'collections/fetchQuotes',
  async (collectionId: string, { rejectWithValue }) => {
    try {
      const quotes = await collectionsService.getCollectionQuotes(collectionId);
      return quotes;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch collection quotes');
    }
  }
);

export const addQuoteToCollection = createAsyncThunk(
  'collections/addQuote',
  async (
    { collectionId, quoteId }: { collectionId: string; quoteId: string },
    { rejectWithValue }
  ) => {
    try {
      const collectionQuote = await collectionsService.addQuoteToCollection(collectionId, quoteId);
      console.log('Added quote to collection:', collectionQuote);
      return collectionQuote;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to add quote');
    }
  }
);

export const removeQuoteFromCollection = createAsyncThunk(
  'collections/removeQuote',
  async (
    { collectionId, quoteId }: { collectionId: string; quoteId: string },
    { rejectWithValue }
  ) => {
    try {
      await collectionsService.removeQuoteFromCollection(collectionId, quoteId);
      return quoteId;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to remove quote');
    }
  }
);

const collectionsSlice = createSlice({
  name: 'collections',
  initialState,
  reducers: {
    selectCollection: (state, action: PayloadAction<Collection>) => {
      state.selectedCollection = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCollections.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCollections.fulfilled, (state, action) => {
        state.isLoading = false;
        state.collections = action.payload;
      })
      .addCase(fetchCollections.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createCollection.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCollection.fulfilled, (state, action) => {
        state.isLoading = false;
        state.collections.push(action.payload);
      })
      .addCase(createCollection.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteCollection.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCollection.fulfilled, (state, action) => {
        state.isLoading = false;
        state.collections = state.collections.filter((c) => c.id !== action.payload);
        if (state.selectedCollection?.id === action.payload) {
          state.selectedCollection = null;
          state.collectionQuotes = [];
        }
      })
      .addCase(deleteCollection.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchCollectionQuotes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCollectionQuotes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.collectionQuotes = action.payload;
      })
      .addCase(fetchCollectionQuotes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(addQuoteToCollection.fulfilled, (state, action) => {
        state.collectionQuotes.push(action.payload);
      })
      .addCase(removeQuoteFromCollection.fulfilled, (state, action) => {
        state.collectionQuotes = state.collectionQuotes.filter((cq) => cq.quoteId !== action.payload);
      });
  },
});

export const { selectCollection, clearError } = collectionsSlice.actions;
export default collectionsSlice.reducer;
