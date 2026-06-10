import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { bookingsApi } from '../api/bookings.api';
import { queryKeys } from '../constants/queryKeys';
import type { BookingStatus, CreateBookingForm } from '../types';

export function useBookingDetail(id: string) {
  return useQuery({
    queryKey: queryKeys.bookings.detail(id),
    queryFn: () => bookingsApi.getById(id),
    staleTime: 15_000,
    enabled: !!id,
  });
}

export function useCreateBooking() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateBookingForm) => bookingsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.bookings.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.metrics });
    },
  });
}

export function useUpdateStatus(bookingId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (status: BookingStatus) => bookingsApi.updateStatus(bookingId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.bookings.detail(bookingId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.bookings.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.metrics });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.byStatus });
    },
  });
}
