import React, { useEffect } from 'react';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';

export const Notification = ({ message, type }) => {
  const createNotification = (type) => {
    return () => {
      switch (type) {
        case 'info':
          NotificationManager.info('dasdsada');
          break;
        case 'success':
          NotificationManager.success('message', 'Успех');
          break;
        case 'warning':
          NotificationManager.warning('message', 'Внимание', 3000);
          break;
        case 'error':
          NotificationManager.error('message', 'Ошибка', 5000, () => {
            alert('callback');
          });
          break;
      }
    };
  };

  return <div></div>;
};
