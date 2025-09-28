'use client';

interface NotificationsHeaderProps {
  onMarkAllAsRead: () => void;
  t: (key: string) => string;
}

export default function NotificationsHeader({ onMarkAllAsRead, t }: NotificationsHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{t('title')}</h1>
      <button
        onClick={onMarkAllAsRead}
        className="text-sm text-blue-500 dark:text-blue-400 hover:underline focus:outline-none"
      >
        {t('markAllAsRead')}
      </button>
    </div>
  );
}