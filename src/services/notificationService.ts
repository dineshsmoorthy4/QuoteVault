// import PushNotification from 'react-native-push-notification';
import { Quote } from '../types';

export const initializeNotifications = (): void => {
//   PushNotification.configure({
//     onNotification(notification) {
//       console.log('Notification received:', notification);
//     },
//     permissions: {
//       alert: true,
//       badge: true,
//       sound: true,
//     },
//     requestPermissions: true,
//   });
};

export const scheduleNotification = (
  quote: Quote,
  time: string,
  title: string = 'Daily Quote'
): void => {
  const [hours, minutes] = time.split(':').map(Number);
  const now = new Date();
  const notificationTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);

  if (notificationTime < now) {
    notificationTime.setDate(notificationTime.getDate() + 1);
  }

  // PushNotification.localNotificationSchedule({
  //   message: quote.content,
  //   title,
  //   subText: `— ${quote.author}`,
  //   date: notificationTime,
  //   repeatType: 'day',
  //   userInfo: {
  //     quoteId: quote.id,
  //   },
  // });
};

export const cancelAllNotifications = (): void => {
  // PushNotification.cancelAllLocalNotifications();
};

export const sendTestNotification = (): void => {
  // PushNotification.localNotification({
  //   message: 'This is a test notification from QuoteVault',
  //   title: 'Test Notification',
  //   playSound: true,
  //   soundName: 'default',
  // });
};
