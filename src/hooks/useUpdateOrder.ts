
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateOrderStatus } from '@/services/orderService';
import { OrderStatus } from '@/types';

export function useUpdateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, status }: { orderId: number; status: OrderStatus }) => updateOrderStatus(orderId, status),
    onSuccess: (data, variables) => {
      // Invalidate and refetch the orders list
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      // Invalidate and refetch the specific order details
      queryClient.invalidateQueries({ queryKey: ['order', variables.orderId] });
    },
  });
}
