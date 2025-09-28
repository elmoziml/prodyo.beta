'use client';

import { Notification, NotificationType } from '@/store/features/notifications/notificationsSlice';
import clsx from 'clsx';
import { formatDistanceToNow } from 'date-fns';
import { ar } from 'date-fns/locale';
import Link from 'next/link';

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  t: (key: string) => string; // Pass the translation function
}

const typeColors: { [key in NotificationType]: string } = {
  info: 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100',
  warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100',
  success: 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100',
  error: 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100',
  promotion: 'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100',
  reminder: 'bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-100',
};

const typeIcons: { [key in NotificationType]: string } = {
  info: 'fi-sr-info',
  warning: 'fi-sr-exclamation',
  success: 'fi-sr-check-circle',
  error: 'fi-sr-circle-xmark',
  promotion: 'fi-sr-bullhorn',
  reminder: 'fi-sr-bell',
};

export default function NotificationItem({ notification, onMarkAsRead, t }: NotificationItemProps) {
  return (
    <li
      key={notification.id}
      onClick={() => onMarkAsRead(notification.id)}
      className={clsx(
        'flex flex-col sm:flex-row items-start p-4 md:p-6 transition-colors cursor-pointer',
        {
          'bg-blue-50 dark:bg-blue-900 hover:bg-blue-100 dark:hover:bg-blue-800': !notification.is_read, // New background for unread
          'hover:bg-gray-50 dark:hover:bg-gray-700': notification.is_read,
        }
      )}
    >
      <div
        className={clsx(
          'w-10 h-10 rounded-[40px] flex-shrink-0 flex items-center justify-center mb-2 sm:mb-0 sm:ml-4',
          typeColors[notification.type] || 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200'
        )}
      >
        <i className={`${typeIcons[notification.type]} text-lg flex`}></i>
      </div>
      <div className="flex-grow text-right">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{notification.title}</h2>
        <p className="text-base text-gray-700 dark:text-gray-200 mt-1">{notification.message}</p>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2">
          <span
            className={clsx(
              'text-xs font-semibold px-2 py-0.5 rounded-[40px] mb-1 sm:mb-0',
              typeColors[notification.type] || 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200'
            )}
          >
            {t(notification.type)}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true, locale: ar })}
          </span>
        </div>
        {notification.action_url && (
          <Link href={notification.action_url} className="text-sm text-blue-500 dark:text-blue-400 hover:underline mt-2 block">
            {t('viewDetails')}
          </Link>
        )}
      </div>
    </li>
  );
}