import { useQuery } from '@tanstack/react-query';
import { bookingsApi } from '../api/bookings.api';
import { queryKeys } from '../constants/queryKeys';
import type { BookingFilters } from '../types';

export function useBookings(filters: BookingFilters) {
  return useQuery({
    queryKey: queryKeys.bookings.list(filters as Record<string, unknown>),
    queryFn: () => bookingsApi.list(filters),
    staleTime: 30_000,
    placeholderData: (prev) => prev, // keeps previous data while new page loads
  });
}
