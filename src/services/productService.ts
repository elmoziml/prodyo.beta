
import { Product } from '@/types';
import axios from 'axios';

export const fetchProducts = async () => {
  const response = await axios.get('/api/products');
  return response.data;
};

export const fetchProductById = async (productId: string) => {
  const response = await axios.get(`/api/products/${productId}`);
  return response.data;
};

export const createProduct = async (productData: Partial<Product>) => {
  const response = await axios.post('/api/products', productData);
  return response.data;
};
