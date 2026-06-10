import type { BookingStatus, PriorityLevel, DriverStatus, ActivityAction } from '../types';

export const BOOKING_STATUS_CONFIG: Record<
  BookingStatus,
  { label: string; className: string; dotColor: string; nextStates: BookingStatus[] }
> = {
  PENDING: {
    label: 'Pending',
    className: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
    dotColor: 'bg-yellow-400',
    nextStates: ['CONFIRMED', 'CANCELLED'],
  },
  CONFIRMED: {
    label: 'Confirmed',
    className: 'bg-blue-100 text-blue-800 border border-blue-200',
    dotColor: 'bg-blue-500',
    nextStates: ['ASSIGNED', 'CANCELLED'],
  },
  ASSIGNED: {
    label: 'Assigned',
    className: 'bg-purple-100 text-purple-800 border border-purple-200',
    dotColor: 'bg-purple-500',
    nextStates: ['IN_PROGRESS', 'CANCELLED'],
  },
  IN_PROGRESS: {
    label: 'In Progress',
    className: 'bg-orange-100 text-orange-800 border border-orange-200',
    dotColor: 'bg-orange-500',
    nextStates: ['COMPLETED', 'CANCELLED'],
  },
  COMPLETED: {
    label: 'Completed',
    className: 'bg-green-100 text-green-800 border border-green-200',
    dotColor: 'bg-green-500',
    nextStates: [],
  },
  CANCELLED: {
    label: 'Cancelled',
    className: 'bg-red-100 text-red-800 border border-red-200',
    dotColor: 'bg-red-400',
    nextStates: [],
  },
};

export const PRIORITY_CONFIG: Record<
  PriorityLevel,
  { label: string; className: string }
> = {
  NORMAL: { label: 'Normal', className: 'bg-gray-100 text-gray-600 border border-gray-200' },
  HIGH: { label: 'HIGH', className: 'bg-red-100 text-red-700 border border-red-300 font-semibold' },
};

export const DRIVER_STATUS_CONFIG: Record<
  DriverStatus,
  { label: string; className: string; dotColor: string }
> = {
  AVAILABLE: { label: 'Available', className: 'bg-green-100 text-green-700', dotColor: 'bg-green-500' },
  BUSY: { label: 'Busy', className: 'bg-orange-100 text-orange-700', dotColor: 'bg-orange-400' },
  OFFLINE: { label: 'Offline', className: 'bg-gray-100 text-gray-500', dotColor: 'bg-gray-400' },
};

export const ACTIVITY_ACTION_CONFIG: Record<
  ActivityAction,
  { label: string; icon: string; color: string }
> = {
  BOOKING_CREATED: { label: 'Booking Created', icon: '📋', color: 'text-blue-600' },
  STATUS_CHANGED: { label: 'Status Updated', icon: '🔄', color: 'text-gray-600' },
  DRIVER_ASSIGNED: { label: 'Driver Assigned', icon: '🚛', color: 'text-green-600' },
  DRIVER_UNASSIGNED: { label: 'Driver Unassigned', icon: '↩️', color: 'text-orange-600' },
  PRIORITY_ESCALATED: { label: 'Priority Escalated', icon: '🚨', color: 'text-red-600' },
  BOOKING_CANCELLED: { label: 'Booking Cancelled', icon: '❌', color: 'text-red-600' },
};
