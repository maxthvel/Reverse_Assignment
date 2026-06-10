import { Router } from 'express';
import { driverController } from '../controllers/driver.controller';
import { validate } from '../middlewares/validate.middleware';
import { createDriverSchema, updateDriverStatusSchema, listDriversQuerySchema } from '../dto/driver.dto';

const router = Router();

router.post('/', validate(createDriverSchema), driverController.create);
router.get('/', validate(listDriversQuerySchema, 'query'), driverController.list);
router.get('/available', driverController.available);
router.patch('/:id/status', validate(updateDriverStatusSchema), driverController.updateStatus);

export default router;
