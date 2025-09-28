
import axios from 'axios';

export const fetchProducts = async () => {
  const response = await axios.get('/api/products');
  return response.data;
};

export const createProduct = async (productData: any) => {
  const response = await axios.post('/api/products', productData);
  return response.data;
};
