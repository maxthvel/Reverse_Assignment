import axios, { AxiosError } from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3001/api/v1',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10_000,
});

// Normalize error messages from API responses
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const message =
      (error.response?.data as { error?: string })?.error ??
      error.message ??
      'An unexpected error occurred';
    return Promise.reject(new Error(message));
  }
);
