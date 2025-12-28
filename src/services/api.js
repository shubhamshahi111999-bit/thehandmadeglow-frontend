import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

const api = axios.create({
  baseURL: `${BACKEND_URL.replace(/\/$/, '')}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/me', data),
};

// Product APIs
export const productAPI = {
  getAllProducts: (category) => api.get('/products', { params: { category } }),
  getProduct: (id) => api.get(`/products/${id}`),
  createProduct: (data) => api.post('/products/', data),
  updateProduct: (id, data) => api.put(`/products/${id}`, data),
  deleteProduct: (id) => api.delete(`/products/${id}`),
};

// Order APIs
export const orderAPI = {
  createOrder: (data) => api.post('/orders', data),
  getMyOrders: () => api.get('/orders/my-orders'),
  getOrder: (id) => api.get(`/orders/${id}`),
  getAllOrders: (status) => api.get('/orders', { params: { status_filter: status } }),
  updateOrderStatus: (id, status) => api.patch(`/orders/${id}/status`, { status }),
};

export default api;
