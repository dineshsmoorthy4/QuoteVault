import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { store, persistor } from './src/store';
import { RootNavigator } from './src/navigation/RootNavigator';
import { useTheme } from './src/hooks';
import { useAppSelector } from './src/hooks/redux';
import * as notificationService from './src/services/notificationService';

const AppContent = () => {
  const { isDark } = useTheme();
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    notificationService.initializeNotifications();
  }, []);

  useEffect(() => {
    StatusBar.setBarStyle(isDark ? 'light-content' : 'dark-content');
  }, [isDark]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        translucent
        backgroundColor="transparent"
      />
      <RootNavigator />
    </GestureHandlerRootView>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContent />
      </PersistGate>
    </Provider>
  );
}
