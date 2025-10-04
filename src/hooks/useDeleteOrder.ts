'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteOrder } from '@/services/orderService';

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderId: number) => deleteOrder(orderId),
    onSuccess: () => {
      // Invalidate the orders query to refetch the updated list
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};
