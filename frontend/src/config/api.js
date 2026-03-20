// API Configuration
// Change this to your Vercel backend URL when deploying

const API_BASE_URL = 
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const API = {
  GET_ALL_PRODUCTS: `${API_BASE_URL}/api/products`,
  GET_PRODUCT: (id) => `${API_BASE_URL}/api/products/${id}`,
  CREATE_PRODUCT: `${API_BASE_URL}/api/products`,
  DELETE_PRODUCT: (id) => `${API_BASE_URL}/api/products/${id}`,
};

export default API;
