// src/app/[locale]/(dashboard)/notifications/page.tsx
'use client';

import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import {
  selectAllNotifications,
  markAsRead,
  markAllAsRead,
} from '@/store/features/notifications/notificationsSlice';
import NotificationsHeader from '@/components/dashboard/notifications/NotificationsHeader';
import NotificationList from '@/components/dashboard/notifications/NotificationList';

export default function NotificationsPage() {
  const dispatch: AppDispatch = useDispatch();
  const notifications = useSelector(selectAllNotifications);

  const handleMarkAsRead = (id: string) => {
    dispatch(markAsRead(id));
  };

  const handleMarkAllAsRead = () => {
    dispatch(markAllAsRead());
  };

  // Hardcoded Arabic translations for the notifications section
  const t = (key: string) => {
    const translations: { [key: string]: string } = {
      title: 'الإشعارات',
      markAllAsRead: 'تحديد الكل كمقروء',
      info: 'معلومات',
      warning: 'تحذير',
      success: 'نجاح',
      error: 'خطأ',
      promotion: 'ترويج',
      reminder: 'تذكير',
      viewDetails: 'عرض التفاصيل',
    };
    return translations[key] || key;
  };

  return (
    <div className="container mx-auto pt-[20px]" dir="rtl">
      <NotificationsHeader onMarkAllAsRead={handleMarkAllAsRead} t={t} />
      <NotificationList notifications={notifications} onMarkAsRead={handleMarkAsRead} t={t} />
    </div>
  );
}
