export const queryKeys = {
  bookings: {
    all: ['bookings'] as const,
    list: (filters: Record<string, unknown>) => ['bookings', 'list', filters] as const,
    detail: (id: string) => ['bookings', 'detail', id] as const,
  },
  drivers: {
    all: ['drivers'] as const,
    list: (filters?: Record<string, unknown>) => ['drivers', 'list', filters] as const,
    available: ['drivers', 'available'] as const,
  },
  customers: {
    all: ['customers'] as const,
  },
  dashboard: {
    metrics: ['dashboard', 'metrics'] as const,
    byStatus: ['dashboard', 'by-status'] as const,
    driverUtilization: ['dashboard', 'driver-utilization'] as const,
  },
};
