import { apiClient } from './client';
import type {
  Booking,
  BookingFilters,
  BookingStatus,
  CreateBookingForm,
  PaginatedResponse,
} from '../types';

export const bookingsApi = {
  list: async (filters: BookingFilters): Promise<PaginatedResponse<Booking>> => {
    // Remove empty string filters before sending
    const cleanFilters = Object.fromEntries(
      Object.entries(filters).filter(([, v]) => v !== '' && v !== undefined)
    );
    const { data } = await apiClient.get('/bookings', { params: cleanFilters });
    return data.data;
  },

  getById: async (id: string): Promise<Booking> => {
    const { data } = await apiClient.get(`/bookings/${id}`);
    return data.data;
  },

  create: async (payload: CreateBookingForm): Promise<Booking> => {
    const { data } = await apiClient.post('/bookings', payload);
    return data.data;
  },

  updateStatus: async (id: string, status: BookingStatus): Promise<Booking> => {
    const { data } = await apiClient.patch(`/bookings/${id}/status`, { status });
    return data.data;
  },

  cancel: async (id: string): Promise<void> => {
    await apiClient.delete(`/bookings/${id}`);
  },
};
