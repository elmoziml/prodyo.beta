
import { useQuery } from '@tanstack/react-query';
import { fetchOrders } from '@/services/orderService';

export function useOrders() {
  return useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
  });
}
