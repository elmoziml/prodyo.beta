import axios from 'axios';

export interface LocationItem {
  id: string;
  name: string;
  name_ar: string;
}

/**
 * Fetch all wilayas (provinces)
 */
export const fetchWilayas = async (): Promise<LocationItem[]> => {
  const response = await axios.get('/api/wilayas');
  return response.data;
};

/**
 * Fetch dairas (districts) for a specific wilaya
 */
export const fetchDairas = async (wilayaId: string): Promise<LocationItem[]> => {
  const response = await axios.get(`/api/wilayas/${wilayaId}/dairas`);
  return response.data;
};

/**
 * Fetch communes (municipalities) for a specific daira
 */
export const fetchCommunes = async (dairaId: string): Promise<LocationItem[]> => {
  const response = await axios.get(`/api/dairas/${dairaId}/communes`);
  return response.data;
};
