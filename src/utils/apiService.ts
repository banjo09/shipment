import axios from 'axios';
import {handleApiError} from './errorHandler';

const BASE_URL = 'https://shippex-demo.bc.brandimic.com/api/method';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include cookies if needed
api.interceptors.request.use(
  config => {
    // You can add auth token here if needed
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Add response interceptor
api.interceptors.response.use(
  response => response,
  error => {
    // Handle errors globally
    if (error.response?.status === 401) {
      // Handle unauthorized
    }
    return Promise.reject(error);
  },
);

export const login = async (email: string, password: string) => {
  const formData = new FormData();
  formData.append('usr', email);
  formData.append('pwd', password);

  try {
    const response = await axios.post(`${BASE_URL}/login`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getShipmentStatusList = async () => {
  try {
    const response = await api.get('/frappe.client.get_list', {
      params: {
        doctype: 'AWB Status',
        fields: JSON.stringify(['*']),
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getShipmentList = async (searchTerm = '') => {
  try {
    const response = await api.get('/frappe.client.get_list', {
      params: {
        doctype: 'AWB',
        fields: JSON.stringify(['*']),
        filters: JSON.stringify({
          name: ['like', `%${searchTerm}%`],
        }),
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;
