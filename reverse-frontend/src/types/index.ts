// ─────────────────────────────────────────────
// Core domain enums & types
// ─────────────────────────────────────────────

export type BookingStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'ASSIGNED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED';

export type PriorityLevel = 'NORMAL' | 'HIGH';

export type DriverStatus = 'AVAILABLE' | 'BUSY' | 'OFFLINE';

export type ActivityAction =
  | 'BOOKING_CREATED'
  | 'STATUS_CHANGED'
  | 'DRIVER_ASSIGNED'
  | 'DRIVER_UNASSIGNED'
  | 'PRIORITY_ESCALATED'
  | 'BOOKING_CANCELLED';

// ─────────────────────────────────────────────
// Entity interfaces
// ─────────────────────────────────────────────

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  vehicleNumber: string;
  status: DriverStatus;
  createdAt: string;
}

export interface Assignment {
  id: string;
  bookingId: string;
  driverId: string;
  assignedAt: string;
  completedAt?: string;
  notes?: string;
  driver?: Driver;
}

export interface ActivityLog {
  id: string;
  bookingId: string;
  action: ActivityAction;
  fromValue?: string;
  toValue?: string;
  performedBy?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface Booking {
  id: string;
  customerId: string;
  pickupAddress: string;
  deliveryAddress: string;
  packageCount: number;
  status: BookingStatus;
  priority: PriorityLevel;
  scheduledAt: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  customer?: Customer;
  assignment?: Assignment;
  activityLogs?: ActivityLog[];
}

// ─────────────────────────────────────────────
// API wrapper types
// ─────────────────────────────────────────────

export interface PaginatedResponse<T> {
  items: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

// ─────────────────────────────────────────────
// Dashboard / reporting
// ─────────────────────────────────────────────

export interface DashboardMetrics {
  totalBookings: number;
  pendingBookings: number;
  highPriorityBookings: number;
  completedToday: number;
  availableDrivers: number;
  assignmentRate: number;
}

export interface BookingsByStatus {
  status: BookingStatus;
  count: string;
}
export type CollectionType =
  | 'HOUSEHOLD'
  | 'APARTMENT'
  | 'OFFICE'
  | 'RETAIL_STORE'
  | 'RESTAURANT_CAFE';

// ─────────────────────────────────────────────
// Form / filter types
// ─────────────────────────────────────────────

export interface CreateBookingForm {
  // Customer fields
  customerName:    string;
  phone:           string;
  email:           string;
  address:         string;
  // Booking fields
  collectionType:  CollectionType;
  pickupAddress:   string;
  deliveryAddress: string;
  packageCount:    number;
  scheduledAt:     string;
  notes?:          string;
}

export interface BookingFilters {
  status?: BookingStatus | '';
  priority?: PriorityLevel | '';
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
}

export interface AssignDriverPayload {
  bookingId: string;
  driverId: string;
  notes?: string;
}
