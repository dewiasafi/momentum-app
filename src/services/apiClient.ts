import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 10000,
});

// Otomatis pasang Bearer token jika tersedia di localStorage
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Tangani response dan error secara global
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // 401 Unauthorized: hapus session dan redirect ke login jika bukan request login
    if (error.response?.status === 401) {
      const isLoginRequest = error.config?.url?.includes('/auth/login');
      if (!isLoginRequest) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      }
    }

    // Ekstrak pesan error dari backend sesuai format ApiResponse / ApiErrorResponse
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      'Terjadi kesalahan pada server';

    const customError = new Error(message);
    // Simpan status dan response asli agar komponen dapat membaca error code (misal 403 Forbidden)
    Object.assign(customError, {
      status: error.response?.status,
      response: error.response,
    });

    return Promise.reject(customError);
  }
);