import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { driversApi } from '../api/drivers.api';
import { assignmentsApi } from '../api/assignments.api';
import { queryKeys } from '../constants/queryKeys';
import type { AssignDriverPayload } from '../types';
import type { DriverStatus } from '../types';

export function useDrivers() {
  return useQuery({
    queryKey: queryKeys.drivers.all,
    queryFn: () => driversApi.list(),
    staleTime: 60_000,
  });
}

export function useAvailableDrivers() {
  return useQuery({
    queryKey: queryKeys.drivers.available,
    queryFn: () => driversApi.getAvailable(),
    staleTime: 15_000,
  });
}

export function useAssignDriver() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: AssignDriverPayload) => assignmentsApi.assign(payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.bookings.detail(variables.bookingId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.bookings.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.drivers.available });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.metrics });
    },
  });
}

export function useUnassignDriver(bookingId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (assignmentId: string) => assignmentsApi.unassign(assignmentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.bookings.detail(bookingId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.bookings.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.drivers.available });
    },
  });
}

export function useCreateDriver() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { name: string; phone: string; vehicleNumber: string }) =>
      driversApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.drivers.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.drivers.available });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.metrics });
    },
  });
}

export function useUpdateDriverStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: DriverStatus }) =>
      driversApi.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.drivers.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.drivers.available });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard.metrics });
    },
  });
}
