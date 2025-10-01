
import { Order } from '@/types';
import axios from 'axios';

export const fetchOrders = async () => {
  const response = await axios.get('/api/orders');
  return response.data;
};

export const fetchOrderById = async (id: string) => {
  if (!id) return null;
  const response = await axios.get(`/api/orders/${id}`);
  return response.data;
};

export const updateOrderStatus = async (orderId: string, status: string) => {
  const response = await axios.put(`/api/orders/${orderId}`, { status });
  return response.data;
};

export const createOrder = async (orderData: Partial<Order>) => {
  const response = await axios.post('/api/orders', orderData);
  return response.data;
};
