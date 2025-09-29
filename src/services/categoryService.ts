
import axios from 'axios';
import { Category } from '@/types';

export const fetchCategories = async () => {
  const response = await axios.get('/api/categories');
  return response.data;
};

export const createCategory = async (categoryData: Omit<Category, 'id'>) => {
  const response = await axios.post('/api/categories', categoryData);
  return response.data;
};

export const updateCategory = async ({ id, ...categoryData }: Partial<Category>) => {
  const response = await axios.put(`/api/categories/${id}`, categoryData);
  return response.data;
};

export const deleteCategory = async (id: string) => {
  await axios.delete(`/api/categories/${id}`);
};
