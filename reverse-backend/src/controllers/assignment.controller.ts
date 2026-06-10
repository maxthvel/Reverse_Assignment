import { Request, Response } from 'express';
import { assignmentService } from '../services/assignment.service';
import { asyncHandler } from '../middlewares/asyncHandler';

export class AssignmentController {
  create = asyncHandler(async (req: Request, res: Response) => {
    const assignment = await assignmentService.createAssignment(req.body);
    res.status(201).json({ success: true, data: assignment });
  });

  unassign = asyncHandler(async (req: Request, res: Response) => {
    const result = await assignmentService.unassign(req.params.id);
    res.json({ success: true, data: result });
  });

  complete = asyncHandler(async (req: Request, res: Response) => {
    const result = await assignmentService.complete(req.params.id);
    res.json({ success: true, data: result });
  });
}

export const assignmentController = new AssignmentController();
