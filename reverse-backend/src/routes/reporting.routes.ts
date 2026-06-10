import { Router } from 'express';
import { reportingController } from '../controllers/reporting.controller';

const router = Router();

router.get('/dashboard', reportingController.dashboard);
router.get('/bookings-by-status', reportingController.bookingsByStatus);
router.get('/driver-utilization', reportingController.driverUtilization);
router.get('/high-priority', reportingController.highPriority);

export default router;
