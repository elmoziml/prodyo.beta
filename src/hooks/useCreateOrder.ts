'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createOrder } from '@/services/orderService';
import { Order } from '@/types';

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderData: Partial<Order>) => createOrder(orderData),
    onSuccess: () => {
      // Invalidate the orders query to refetch the updated list
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};
