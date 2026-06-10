import { apiClient } from './client';
import type { Driver, DriverStatus } from '../types';

export const driversApi = {
  list: async (status?: DriverStatus): Promise<Driver[]> => {
    const { data } = await apiClient.get('/drivers', { params: status ? { status } : {} });
    return data.data;
  },

  getAvailable: async (): Promise<Driver[]> => {
    const { data } = await apiClient.get('/drivers/available');
    return data.data;
  },

  updateStatus: async (id: string, status: DriverStatus): Promise<Driver> => {
    const { data } = await apiClient.patch(`/drivers/${id}/status`, { status });
    return data.data;
  },

  create: async (payload: { name: string; phone: string; vehicleNumber: string }): Promise<Driver> => {
    const { data } = await apiClient.post('/drivers', payload);
    return data.data;
  },
};
