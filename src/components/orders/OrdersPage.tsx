
'use client';

import { useState, useMemo } from 'react';
import { useOrders } from '@/hooks/useOrders';
import { useUpdateOrder } from '@/hooks/useUpdateOrder';
import { useDeleteOrder } from '@/hooks/useDeleteOrder';

import { format, parseISO } from 'date-fns';
import { useTranslations } from 'next-intl';
import Modal from '../ui/Modal';
import OrderDetailModal from './OrderDetailModal';
import OrderFilters from './OrderFilters';
import { Order, OrderStatus } from '@/types';

const getStatusChip = (status: OrderStatus) => {
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
    case 'Returned':
      return `bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300 ${baseClasses}`;
    case 'Pending':
      return `bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 ${baseClasses}`;
    default:
      return `bg-gray-200 text-gray-800 ${baseClasses}`;
  }
};

const orderStatuses: OrderStatus[] = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Canceled', 'Returned'];

export default function OrdersPage() {
  const t = useTranslations('OrdersPage');
  const tStatus = useTranslations('OrderStatus');
  const { data: orders, isLoading, isError } = useOrders();
  const updateOrderMutation = useUpdateOrder();
  const deleteOrderMutation = useDeleteOrder();

  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<number | null>(null);

  const [filters, setFilters] = useState({
    searchTerm: '',
    status: '',
    startDate: null,
    endDate: null,
  });

  const handleStatusChange = (orderId: number, newStatus: OrderStatus) => {
    updateOrderMutation.mutate({ orderId, status: newStatus });
  };

  const filteredOrders = useMemo(() => {
    if (!orders) return [];
    return orders.filter((order: Order) => {
      const { searchTerm, status, startDate, endDate } = filters;
      
      const searchTermLower = searchTerm.toLowerCase();
      const matchesSearch = searchTerm ? 
        order.display_id.toLowerCase().includes(searchTermLower) || 
        (order.customer_name || '').toLowerCase().includes(searchTermLower) : true;

      const matchesStatus = status ? order.status === status : true;

      const orderDate = parseISO(order.order_date);
      const matchesStartDate = startDate ? orderDate >= new Date(startDate) : true;
      const matchesEndDate = endDate ? orderDate <= new Date(endDate) : true;

      return matchesSearch && matchesStatus && matchesStartDate && matchesEndDate;
    });
  }, [orders, filters]);

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const handleOpenDetailModal = (orderId: number) => {
    setSelectedOrderId(orderId);
  };

  const handleCloseDetailModal = () => {
    setSelectedOrderId(null);
  };

  const handleOpenDeleteModal = (orderId: number) => {
    setOrderToDelete(orderId);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setOrderToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (orderToDelete) {
      deleteOrderMutation.mutate(orderToDelete, {
        onSuccess: () => {
          handleCloseDeleteModal();
        }
      });
    }
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 text-start">{order.customer_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 text-start">
                    {format(new Date(order.order_date), 'dd/MM/yyyy')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-start">
                    <select 
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                      className={`${getStatusChip(order.status)} border-none outline-none appearance-none bg-transparent cursor-pointer`}
                      disabled={updateOrderMutation.isPending}
                    >
                      {orderStatuses.map(s => (
                        <option key={s} value={s}>{tStatus(s)}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 text-start">{parseFloat(order.total_amount as any).toFixed(2)} دج</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-start space-x-2">
                    <button 
                      onClick={() => handleOpenDetailModal(order.id)}
                      className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-200 font-semibold"
                    >
                      {t('detailsButton')}
                    </button>
                    <button 
                      onClick={() => handleOpenDeleteModal(order.id)}
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-200 font-semibold"
                    >
                      {t('deleteButton')}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal isOpen={!!selectedOrderId} onClose={handleCloseDetailModal} title={t('modal.title')}>
        <OrderDetailModal orderId={selectedOrderId} onClose={handleCloseDetailModal} />
      </Modal>

      <Modal isOpen={isDeleteModalOpen} onClose={handleCloseDeleteModal} title={t('deleteModal.title')}>
        <div>
          <p>{t('deleteModal.confirmation')}</p>
          <div className="flex justify-end gap-4 mt-4">
            <button onClick={handleCloseDeleteModal} className="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded-lg">{t('deleteModal.cancel')}</button>
            <button onClick={handleDeleteConfirm} disabled={deleteOrderMutation.isPending} className="px-4 py-2 bg-red-600 text-white rounded-lg disabled:opacity-50">
              {deleteOrderMutation.isPending ? t('deleteModal.deleting') : t('deleteModal.confirm')}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
