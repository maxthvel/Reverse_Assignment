import { useQuery } from '@tanstack/react-query';
import { reportingApi } from '../api/reporting.api';
import { queryKeys } from '../constants/queryKeys';

export function useDashboardMetrics() {
  return useQuery({
    queryKey: queryKeys.dashboard.metrics,
    queryFn: () => reportingApi.getDashboardMetrics(),
    staleTime: 30_000,
    refetchInterval: 60_000, // auto-refresh every minute
  });
}

export function useBookingsByStatus() {
  return useQuery({
    queryKey: queryKeys.dashboard.byStatus,
    queryFn: () => reportingApi.getBookingsByStatus(),
    staleTime: 30_000,
  });
}
