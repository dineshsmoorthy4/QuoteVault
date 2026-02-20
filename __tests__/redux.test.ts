import { configureStore } from '@reduxjs/toolkit';
import authReducer, { setUser, clearError } from '@/store/slices/authSlice';
import { User } from '@/types';

describe('Auth Slice', () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: authReducer,
      },
    });
  });

  it('should handle setUser', () => {
    const mockUser: User = {
      id: '1',
      email: 'test@example.com',
      username: 'testuser',
      preferences: {
        theme: 'light',
        fontSize: 'medium',
        accentColor: 'indigo',
        notificationTime: '09:00',
        notificationsEnabled: true,
      },
      createdAt: new Date().toISOString(),
    };

    store.dispatch(setUser(mockUser));
    const state = store.getState().auth;

    expect(state.user).toEqual(mockUser);
    expect(state.isAuthenticated).toBe(true);
  });

  it('should handle clearError', () => {
    store.dispatch(clearError());
    expect(store.getState().auth.error).toBeNull();
  });
});
