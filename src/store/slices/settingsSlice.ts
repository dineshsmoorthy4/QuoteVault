import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SettingsState } from '../../types';
import { DEFAULT_PREFERENCES } from '../../constants/theme';

const initialState: SettingsState = {
  theme: 'light',
  fontSize: DEFAULT_PREFERENCES.fontSize,
  accentColor: DEFAULT_PREFERENCES.accentColor,
  notificationTime: DEFAULT_PREFERENCES.notificationTime,
  notificationsEnabled: DEFAULT_PREFERENCES.notificationsEnabled,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    setFontSize: (state, action: PayloadAction<'small' | 'medium' | 'large'>) => {
      state.fontSize = action.payload;
    },
    setAccentColor: (state, action: PayloadAction<'indigo' | 'purple' | 'blue' | 'green' | 'red'>) => {
      state.accentColor = action.payload;
    },
    setNotificationTime: (state, action: PayloadAction<string>) => {
      state.notificationTime = action.payload;
    },
    setNotificationsEnabled: (state, action: PayloadAction<boolean>) => {
      state.notificationsEnabled = action.payload;
    },
    resetSettings: (state) => {
      return initialState;
    },
  },
});

export const {
  setTheme,
  setFontSize,
  setAccentColor,
  setNotificationTime,
  setNotificationsEnabled,
  resetSettings,
} = settingsSlice.actions;

export default settingsSlice.reducer;
