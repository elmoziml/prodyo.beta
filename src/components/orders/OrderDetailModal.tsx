
'use client';

import { useTranslations } from 'next-intl';
import { format } from 'date-fns';
import { useOrderDetail } from '@/hooks/useOrderDetail';

interface OrderDetailModalProps {
  orderId: string | null;
  onClose: () => void;
}

export default function OrderDetailModal({ orderId, onClose }: OrderDetailModalProps) {
  const t = useTranslations('OrdersPage.modal');
  const tStatus = useTranslations('OrderStatus');
  const { data: order, isLoading, isError } = useOrderDetail(orderId);

  if (isLoading) {
    return <div className="p-8 text-center">{t('loadingDetails')}</div>;
  }

  if (isError || !order) {
    return <div className="p-8 text-center text-red-500">{t('errorDetails')}</div>;
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="printable-area light bg-white text-black p-8 rounded-lg max-w-4xl mx-auto">
      <style jsx global>{`
        @media print {
          body * { visibility: hidden; }
          .printable-area, .printable-area * { visibility: visible; }
          .printable-area { position: absolute; left: 0; top: 0; width: 100%; background: white; color: black; padding: 20px; }
          .no-print { display: none; }
        }
      `}</style>

      <div className="flex justify-between items-start mb-8">
        <div>
          <h3 className="text-3xl font-bold text-gray-800">{t('title')}</h3>
          <p className="text-gray-500">{order.display_id}</p>
        </div>
        <div className="text-right">
          <p className="font-semibold">{t('date')}</p>
          <p className="text-gray-600">{format(new Date(order.order_date), 'PPP')}</p>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg mb-8">
        <h4 className="text-lg font-semibold text-gray-700 mb-2">{t('customerInfo')}</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <p><strong className="font-medium text-gray-600">{t('name')}:</strong> {order.customer.full_name}</p>
            <p><strong className="font-medium text-gray-600">{t('email')}:</strong> {order.customer.email}</p>
            <p><strong className="font-medium text-gray-600">{t('phone')}:</strong> {order.customer.phone}</p>
            <p><strong className="font-medium text-gray-600">{t('address')}:</strong> {order.customer.address}</p>
            <p><strong className="font-medium text-gray-600">{t('status')}:</strong> {tStatus(order.status as any)}</p>
        </div>
      </div>

      <div>
        <h4 className="text-lg font-semibold text-gray-700 mb-2">{t('orderSummary')}</h4>
        <div className="overflow-x-auto border rounded-lg">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left font-semibold">{t('items')}</th>
                <th className="p-3 text-center font-semibold">{t('quantity')}</th>
                <th className="p-3 text-right font-semibold">{t('price')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {order.items.map((item: any) => (
                <tr key={item.id}>
                  <td className="p-3">
                    <p className="font-medium text-gray-800">{item.product_name}</p>
                    {item.selected_options && Object.keys(item.selected_options).length > 0 && (
                      <div className="text-xs text-gray-500 mt-1">
                        {Object.entries(item.selected_options).map(([key, value]) => (
                          <span key={key} className="mr-2">
                            <strong className="capitalize">{t(key as any) || key}:</strong> {String(value)}
                          </span>
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="p-3 text-center">{item.quantity}</td>
                  <td className="p-3 text-right font-medium">DA {(item.price_at_purchase * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50">
              <tr className="font-bold">
                <td colSpan={2} className="p-3 text-right text-gray-700">{t('total')}</td>
                <td className="p-3 text-right text-xl text-gray-900">DA {order.total_amount.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div className="mt-10 flex justify-end gap-4 no-print">
        <button onClick={handlePrint} className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:outline-none">
          {t('print')}
        </button>
        <button onClick={onClose} className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 focus:outline-none">
          {t('close')}
        </button>
      </div>
    </div>
  );
}

