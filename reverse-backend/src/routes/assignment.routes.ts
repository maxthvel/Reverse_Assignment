import { Router } from 'express';
import { assignmentController } from '../controllers/assignment.controller';
import { validate } from '../middlewares/validate.middleware';
import { createAssignmentSchema } from '../dto/assignment.dto';

const router = Router();

router.post('/', validate(createAssignmentSchema), assignmentController.create);
router.delete('/:id', assignmentController.unassign);
router.patch('/:id/complete', assignmentController.complete);

export default router;
