import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotificationState } from '../../types';

const initialState: NotificationState = {
  isEnabled: true,
  time: '09:00',
  nextQuoteId: undefined,
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotificationsEnabled: (state, action: PayloadAction<boolean>) => {
      state.isEnabled = action.payload;
    },
    setNotificationTime: (state, action: PayloadAction<string>) => {
      state.time = action.payload;
    },
    setNextQuoteId: (state, action: PayloadAction<string | undefined>) => {
      state.nextQuoteId = action.payload;
    },
  },
});

export const { setNotificationsEnabled, setNotificationTime, setNextQuoteId } =
  notificationsSlice.actions;

export default notificationsSlice.reducer;
