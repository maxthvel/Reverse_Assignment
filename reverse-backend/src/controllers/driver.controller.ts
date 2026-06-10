import { Request, Response } from 'express';
import { driverService } from '../services/driver.service';
import { asyncHandler } from '../middlewares/asyncHandler';

export class DriverController {
  create = asyncHandler(async (req: Request, res: Response) => {
    const driver = await driverService.createDriver(req.body);
    res.status(201).json({ success: true, data: driver });
  });

  list = asyncHandler(async (req: Request, res: Response) => {
    const status = req.query.status as any;
    const drivers = await driverService.listDrivers(status);
    res.json({ success: true, data: drivers });
  });

  available = asyncHandler(async (_req: Request, res: Response) => {
    const drivers = await driverService.getAvailableDrivers();
    res.json({ success: true, data: drivers });
  });

  updateStatus = asyncHandler(async (req: Request, res: Response) => {
    const updated = await driverService.updateStatus(req.params.id, req.body.status);
    res.json({ success: true, data: updated });
  });
}

export const driverController = new DriverController();
