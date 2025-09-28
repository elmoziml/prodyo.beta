import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// You can add interceptors here for handling requests and responses globally
// For example, adding an auth token to every request:
/*
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Or get it from your state management
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
*/

export default axiosInstance;
