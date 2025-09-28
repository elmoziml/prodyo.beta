import axiosInstance from '@/lib/axios';
import { AxiosError, AxiosResponse } from 'axios';

const apiService = {
  async get<T>(url: string, params?: object): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axiosInstance.get(url, { params });
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError);
      throw error;
    }
  },

  async post<T>(url: string, data: object): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axiosInstance.post(url, data);
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError);
      throw error;
    }
  },

  async put<T>(url: string, data: object): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axiosInstance.put(url, data);
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError);
      throw error;
    }
  },

  async delete<T>(url: string): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axiosInstance.delete(url);
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError);
      throw error;
    }
  },

  handleError(error: AxiosError) {
    // You can handle errors globally here
    // For example, logging errors or showing a notification
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('API Error Response:', error.response.data);
      console.error('Status:', error.response.status);
      console.error('Headers:', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('API Error Request:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('API Error Message:', error.message);
    }
  },
};

export default apiService;
