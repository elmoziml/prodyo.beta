
'use client';

import { useState } from 'react';
import { useOrders } from '@/hooks/useOrders';
import { format } from 'date-fns';
import { useTranslations, useLocale } from 'next-intl';
import Modal from '../ui/Modal';
import OrderDetailModal from './OrderDetailModal';

// Define the types based on the dummy data
interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  options?: Record<string, string>;
}
interface Order {
  id: string;
  customer: string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Canceled' | 'Pending';
  total: number;
  items: OrderItem[];
}

const getStatusChip = (status: Order['status']) => {
  const baseClasses = 'px-2 py-1 text-xs font-medium rounded-full inline-block';
  switch (status) {
    case 'Processing':
      return `bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 ${baseClasses}`;
    case 'Shipped':
      return `bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 ${baseClasses}`;
    case 'Delivered':
      return `bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 ${baseClasses}`;
    case 'Canceled':
      return `bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 ${baseClasses}`;
    case 'Pending':
      return `bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 ${baseClasses}`;
    default:
      return `bg-gray-200 text-gray-800 ${baseClasses}`;
  }
};

export default function OrdersPage() {
  const t = useTranslations('OrdersPage');
  const tStatus = useTranslations('OrderStatus');
  const locale = useLocale();
  const { data: orders, isLoading, isError } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleOpenModal = (order: Order) => {
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  if (isLoading) {
    return <div className="text-center py-10">{t('loading')}</div>;
  }

  if (isError) {
    return <div className="text-center py-10 text-red-500">{t('error')}</div>;
  }

  return (
    <div className="bg-white dark:bg-body-dark shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 text-start">{t('title')}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('table.orderId')}</th>
              <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('table.customer')}</th>
              <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('table.date')}</th>
              <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('table.status')}</th>
              <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('table.total')}</th>
              <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('table.actions')}</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-body-dark divide-y divide-gray-200 dark:divide-gray-700">
            {orders?.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-10">{t('empty')}</td>
              </tr>
            ) : (
              orders?.map((order: Order) => (
                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white text-start">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 text-start">{order.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 text-start">
                    {format(new Date(order.date), 'dd/MM/yyyy')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-start">
                    <span className={getStatusChip(order.status)}>{tStatus(order.status)}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 text-start">${order.total.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-start">
                    <button 
                      onClick={() => handleOpenModal(order)}
                      className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-200 font-semibold"
                    >
                      {t('detailsButton')}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal isOpen={!!selectedOrder} onClose={handleCloseModal} title={t('modal.title')}>
        <OrderDetailModal order={selectedOrder} onClose={handleCloseModal} />
      </Modal>
    </div>
  );
}
