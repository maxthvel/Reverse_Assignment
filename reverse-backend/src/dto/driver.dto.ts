import { z } from 'zod';

export const createDriverSchema = z.object({
  name: z.string().min(2).max(100),
  phone: z.string().min(7).max(20),
  vehicleNumber: z.string().min(4).max(20),
});

export const updateDriverStatusSchema = z.object({
  status: z.enum(['AVAILABLE', 'BUSY', 'OFFLINE']),
});

export const listDriversQuerySchema = z.object({
  status: z.enum(['AVAILABLE', 'BUSY', 'OFFLINE']).optional(),
});

export type CreateDriverDTO = z.infer<typeof createDriverSchema>;
export type UpdateDriverStatusDTO = z.infer<typeof updateDriverStatusSchema>;
