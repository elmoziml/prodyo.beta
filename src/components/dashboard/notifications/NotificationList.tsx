'use client';

import { Notification } from '@/store/features/notifications/notificationsSlice';
import NotificationItem from './NotificationItem';

interface NotificationListProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  t: (key: string) => string;
}

export default function NotificationList({ notifications, onMarkAsRead, t }: NotificationListProps) {
  return (
    <div className="bg-white dark:bg-gray-700 shadow-lg rounded-[40px] overflow-hidden">
      <ul className="divide-y divide-gray-200 dark:divide-gray-600">
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onMarkAsRead={onMarkAsRead}
            t={t}
          />
        ))}
      </ul>
    </div>
  );
}