import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

api.interceptors.response.use(
  (response) => {
    // Check if response contains success: false with token expired message
    if (response.data && response.data.success === false && response.data.message?.toLowerCase().includes("token")) {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent("auth-expired", { detail: { message: response.data.message } }));
      }
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      const msg = error.response.data?.message || 'Your session has expired. Please login again.';
      window.dispatchEvent(new CustomEvent("auth-expired", { detail: { message: msg } }));
    }
    return Promise.reject(error);
  }
);

export default api;
