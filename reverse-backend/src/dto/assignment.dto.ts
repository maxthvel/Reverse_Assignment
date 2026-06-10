import { z } from 'zod';

export const createAssignmentSchema = z.object({
  bookingId: z.string().uuid(),
  driverId: z.string().uuid(),
  notes: z.string().max(500).optional(),
});

export type CreateAssignmentDTO = z.infer<typeof createAssignmentSchema>;
