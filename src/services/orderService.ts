
import { Order, OrderStatus } from '@/types';
import axios from 'axios';

export const fetchOrders = async (): Promise<Order[]> => {
  const response = await axios.get('/api/orders');
  return response.data;
};

export const fetchOrderById = async (id: number | null): Promise<Order | null> => {
  console.log('Fetching order with ID:', id);
  if (!id) return null;
  try {
    const response = await axios.get(`/api/orders/${id}`);
    console.log('Order data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching order:', error);
    throw error;
  }
};

export const updateOrderStatus = async (orderId: number, status: OrderStatus): Promise<Order> => {
  const response = await axios.put(`/api/orders/${orderId}`, { status });
  return response.data;
};

export const createOrder = async (orderData: Partial<Order>): Promise<Order> => {
  const response = await axios.post('/api/orders', orderData);
  return response.data;
};

export const deleteOrder = async (orderId: number): Promise<void> => {
  await axios.delete(`/api/orders/${orderId}`);
};
