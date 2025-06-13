import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const BASE_URL = 'http://192.168.150.102:8000'; // cập nhật đúng IP backend

const api = axios.create({
  baseURL: BASE_URL, // Nếu API của bạn có prefix /api, nếu không thì để BASE_URL thôi
  timeout: 5000,
});

// Thêm interceptor để tự động gắn token Bearer mỗi lần gọi api
api.interceptors.request.use(
  async config => {
    const token = await SecureStore.getItemAsync('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export default api;
