import { Request, Response } from 'express';
import { reportingService } from '../services/reporting.service';
import { asyncHandler } from '../middlewares/asyncHandler';

export class ReportingController {
  dashboard = asyncHandler(async (_req: Request, res: Response) => {
    const metrics = await reportingService.getDashboardMetrics();
    res.json({ success: true, data: metrics });
  });

  bookingsByStatus = asyncHandler(async (_req: Request, res: Response) => {
    const data = await reportingService.getBookingsByStatus();
    res.json({ success: true, data });
  });

  driverUtilization = asyncHandler(async (_req: Request, res: Response) => {
    const data = await reportingService.getDriverUtilization();
    res.json({ success: true, data });
  });

  highPriority = asyncHandler(async (_req: Request, res: Response) => {
    const data = await reportingService.getHighPriorityStats();
    res.json({ success: true, data });
  });
}

export const reportingController = new ReportingController();
