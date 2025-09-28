
import axios from 'axios';

export const fetchOrders = async () => {
  const response = await axios.get('/api/orders');
  return response.data;
};
