import { apiClient } from './client';
import type { DashboardMetrics, BookingsByStatus } from '../types';

export const reportingApi = {
  getDashboardMetrics: async (): Promise<DashboardMetrics> => {
    const { data } = await apiClient.get('/reports/dashboard');
    return data.data;
  },

  getBookingsByStatus: async (): Promise<BookingsByStatus[]> => {
    const { data } = await apiClient.get('/reports/bookings-by-status');
    return data.data;
  },
};
