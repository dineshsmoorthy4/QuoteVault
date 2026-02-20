import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authReducer from './slices/authSlice';
import quotesReducer from './slices/quotesSlice';
import favoritesReducer from './slices/favoritesSlice';
import collectionsReducer from './slices/collectionsSlice';
import settingsReducer from './slices/settingsSlice';
import notificationsReducer from './slices/notificationsSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'settings', 'notifications'],
  blacklist: ['quotes', 'favorites', 'collections'],
};

const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
};

const settingsPersistConfig = {
  key: 'settings',
  storage: AsyncStorage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedSettingsReducer = persistReducer(settingsPersistConfig, settingsReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    quotes: quotesReducer,
    favorites: favoritesReducer,
    collections: collectionsReducer,
    settings: persistedSettingsReducer,
    notifications: notificationsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
