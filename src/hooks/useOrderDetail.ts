
import { useQuery } from '@tanstack/react-query';
import { fetchOrderById } from '@/services/orderService';

export function useOrderDetail(orderId: number | null) {
  return useQuery({
    queryKey: ['order', orderId],
    queryFn: () => fetchOrderById(orderId!),
    enabled: !!orderId, // Only run the query if orderId is not null
  });
}
