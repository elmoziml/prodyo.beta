import axios from 'axios';
import { CategoryWithProducts } from '@/types';

export interface StorefrontData {
  categoriesWithProducts: CategoryWithProducts[];
}

/**
 * Fetch storefront data (categories with their products)
 * Used for the public homepage
 */
export const fetchStorefrontData = async (): Promise<StorefrontData> => {
  const response = await axios.get('/api/storefront');
  return response.data;
};
