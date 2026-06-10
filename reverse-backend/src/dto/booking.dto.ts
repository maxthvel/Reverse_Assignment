import { z } from 'zod';

export const COLLECTION_TYPES = [
  'HOUSEHOLD',
  'APARTMENT',
  'OFFICE',
  'RETAIL_STORE',
  'RESTAURANT_CAFE',
] as const;

export const createBookingSchema = z.object({
  // Customer fields — looked up by email or auto-created
  customerName:  z.string().min(2, 'Customer name is required'),
  phone:         z.string().min(7, 'Phone number is required'),
  email:         z.string().email('Invalid email address'),
  address:       z.string().min(5, 'Address is too short'),

  // Booking fields
  collectionType:  z.enum(COLLECTION_TYPES, { errorMap: () => ({ message: 'Invalid collection type' }) }),
  pickupAddress:   z.string().min(5, 'Pickup address is too short'),
  deliveryAddress: z.string().min(5, 'Delivery address is too short'),
  packageCount:    z.number().int().positive().max(10000),
  scheduledAt:     z.string().datetime(),
  notes:           z.string().max(500).optional(),
});

export const updateStatusSchema = z.object({
  status: z.enum(['PENDING', 'CONFIRMED', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']),
});

export const listBookingsQuerySchema = z.object({
  status: z
    .enum(['PENDING', 'CONFIRMED', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'])
    .optional(),
  priority:       z.enum(['NORMAL', 'HIGH']).optional(),
  collectionType: z.enum(COLLECTION_TYPES).optional(),
  search:         z.string().optional(),
  page:           z.coerce.number().int().positive().default(1),
  limit:          z.coerce.number().int().min(1).max(100).default(10),
  sortBy:         z.string().default('createdAt'),
  order:          z.enum(['asc', 'desc']).default('desc'),
});

export type CreateBookingDTO   = z.infer<typeof createBookingSchema>;
export type UpdateStatusDTO    = z.infer<typeof updateStatusSchema>;
export type ListBookingsQuery  = z.infer<typeof listBookingsQuerySchema>;

