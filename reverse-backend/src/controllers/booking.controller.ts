import { Request, Response } from 'express';
import { bookingService } from '../services/booking.service';
import { asyncHandler } from '../middlewares/asyncHandler';

export class BookingController {
  create = asyncHandler(async (req: Request, res: Response) => {
    const booking = await bookingService.createBooking(req.body);
    res.status(201).json({ success: true, data: booking });
  });

  list = asyncHandler(async (req: Request, res: Response) => {
    const result = await bookingService.listBookings(req.query as any);
    res.json({ success: true, data: result });
  });

  getById = asyncHandler(async (req: Request, res: Response) => {
    const booking = await bookingService.getBookingById(req.params.id);
    res.json({ success: true, data: booking });
  });

  updateStatus = asyncHandler(async (req: Request, res: Response) => {
    const updated = await bookingService.updateStatus(req.params.id, req.body.status);
    res.json({ success: true, data: updated });
  });

  cancel = asyncHandler(async (req: Request, res: Response) => {
    const result = await bookingService.cancelBooking(req.params.id);
    res.json({ success: true, data: result });
  });
}

export const bookingController = new BookingController();
