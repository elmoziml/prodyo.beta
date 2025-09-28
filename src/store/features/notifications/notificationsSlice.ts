// src/store/features/notifications/notificationsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store/store';

export type NotificationType = 'info' | 'warning' | 'success' | 'error' | 'promotion' | 'reminder';
export type NotificationStatus = 'pending' | 'sent' | 'failed' | 'read' | 'archived';

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: NotificationType;
  status: NotificationStatus;
  sent_at?: string; // TIMESTAMPTZ can be null
  is_read: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  action_url?: string; // TEXT can be null
}

interface NotificationsState {
  items: Notification[];
}

const initialState: NotificationsState = {
  items: [
    {
      id: '1',
      user_id: 'user123',
      title: 'ميزة جديدة متوفرة!',
      message: 'أداة فك تشفير VIN متاحة الآن. تحقق منها!',
      type: 'promotion',
      status: 'sent',
      is_read: false,
      is_deleted: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      action_url: '/dashboard/vin-decoder',
    },
    {
      id: '2',
      user_id: 'user123',
      title: 'تذكير بالاشتراك',
      message: 'اشتراكك سينتهي خلال 3 أيام. جدد الآن لتجنب الانقطاع.',
      type: 'reminder',
      status: 'sent',
      is_read: false,
      is_deleted: false,
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      action_url: '/dashboard/financial-profile',
    },
    {
      id: '3',
      user_id: 'user123',
      title: 'صيانة النظام',
      message: 'تحديث النظام مقرر غدًا الساعة 2 صباحًا. قد يكون هناك توقف قصير.',
      type: 'info',
      status: 'sent',
      is_read: true,
      is_deleted: false,
      created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '4',
      user_id: 'user123',
      title: 'تنبيه أمني هام',
      message: 'تم اكتشاف نشاط تسجيل دخول غير عادي على حسابك. يرجى مراجعة إعدادات الأمان الخاصة بك.',
      type: 'warning',
      status: 'sent',
      is_read: false,
      is_deleted: false,
      created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '5',
      user_id: 'user123',
      title: 'فشل الدفع',
      message: 'فشلت عملية الدفع الأخيرة لخدمة X. يرجى تحديث طريقة الدفع الخاصة بك.',
      type: 'error',
      status: 'failed',
      is_read: false,
      is_deleted: false,
      created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '6',
      user_id: 'user123',
      title: 'مرحبًا بك في KontriloTech!',
      message: 'شكرًا لانضمامك إلى منصتنا. استكشف ميزاتنا وابدأ الآن.',
      type: 'success',
      status: 'sent',
      is_read: true,
      is_deleted: false,
      created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ],
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    markAsRead: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.is_read = true;
      }
    },
    markAllAsRead: (state) => {
      state.items.forEach((item) => {
        item.is_read = true;
      });
    },
  },
});

export const { markAsRead, markAllAsRead } = notificationsSlice.actions;

export const selectAllNotifications = (state: RootState) => state.notifications.items;
export const selectUnreadNotificationsCount = (state: RootState) =>
  state.notifications.items.filter((item) => !item.is_read).length;

export default notificationsSlice.reducer;
