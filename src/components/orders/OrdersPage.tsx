
'use client';

import { useState, useMemo } from 'react';
import { useOrders } from '@/hooks/useOrders';
import { format, parseISO } from 'date-fns';
import { useTranslations } from 'next-intl';
import Modal from '../ui/Modal';
import OrderDetailModal from './OrderDetailModal';
import OrderFilters from './OrderFilters';

// Types remain the same
interface Customer {
  id: string;
  full_name: string;
}
interface Order {
  id: string;
  display_id: string;
  customer: Customer;
  order_date: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Canceled' | 'Pending';
  total_amount: number;
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
  const { data: orders, isLoading, isError } = useOrders();
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    searchTerm: '',
    status: '',
    startDate: null,
    endDate: null,
  });

  const filteredOrders = useMemo(() => {
    if (!orders) return [];
    return orders.filter((order: Order) => {
      const { searchTerm, status, startDate, endDate } = filters;
      
      // Search term filter
      const searchTermLower = searchTerm.toLowerCase();
      const matchesSearch = searchTerm ? 
        order.display_id.toLowerCase().includes(searchTermLower) || 
        order.customer.full_name.toLowerCase().includes(searchTermLower) : true;

      // Status filter
      const matchesStatus = status ? order.status === status : true;

      // Date filter
      const orderDate = parseISO(order.order_date);
      const matchesStartDate = startDate ? orderDate >= new Date(startDate) : true;
      const matchesEndDate = endDate ? orderDate <= new Date(endDate) : true;

      return matchesSearch && matchesStatus && matchesStartDate && matchesEndDate;
    });
  }, [orders, filters]);

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const handleOpenModal = (orderId: string) => {
    setSelectedOrderId(orderId);
  };

  const handleCloseModal = () => {
    setSelectedOrderId(null);
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
      
      <OrderFilters onFilterChange={handleFilterChange} />

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
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-10">{t('empty')}</td>
              </tr>
            ) : (
              filteredOrders.map((order: Order) => (
                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white text-start">{order.display_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 text-start">{order.customer.full_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 text-start">
                    {format(new Date(order.order_date), 'dd/MM/yyyy')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-start">
                    <span className={getStatusChip(order.status)}>{tStatus(order.status)}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 text-start">DA {order.total_amount.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-start">
                    <button 
                      onClick={() => handleOpenModal(order.id)}
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

      <Modal isOpen={!!selectedOrderId} onClose={handleCloseModal} title={t('modal.title')}>
        <OrderDetailModal orderId={selectedOrderId} onClose={handleCloseModal} />
      </Modal>
    </div>
  );
}
