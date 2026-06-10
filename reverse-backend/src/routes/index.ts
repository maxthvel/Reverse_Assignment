import { Router } from 'express';
import bookingRoutes from './booking.routes';
import driverRoutes from './driver.routes';
import assignmentRoutes from './assignment.routes';
import reportingRoutes from './reporting.routes';

const router = Router();

router.use('/bookings', bookingRoutes);
router.use('/drivers', driverRoutes);
router.use('/assignments', assignmentRoutes);
router.use('/reports', reportingRoutes);

export default router;
