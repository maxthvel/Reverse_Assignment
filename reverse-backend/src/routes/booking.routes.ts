import { Router } from 'express';
import { bookingController } from '../controllers/booking.controller';
import { validate } from '../middlewares/validate.middleware';
import {
  createBookingSchema,
  updateStatusSchema,
  listBookingsQuerySchema,
} from '../dto/booking.dto';

const router = Router();

router.post('/', validate(createBookingSchema), bookingController.create);
router.get('/', validate(listBookingsQuerySchema, 'query'), bookingController.list);
router.get('/:id', bookingController.getById);
router.patch('/:id/status', validate(updateStatusSchema), bookingController.updateStatus);
router.delete('/:id', bookingController.cancel);

export default router;
