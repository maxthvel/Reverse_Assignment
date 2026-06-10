import { bookingRepository, BookingFilters } from '../repositories/booking.repository';
import { assignmentRepository } from '../repositories/assignment.repository';
import { driverRepository } from '../repositories/driver.repository';
import { activityService } from './activity.service';
import { AppError } from '../middlewares/error.middleware';
import { BookingStatus } from '../models/Booking.model';
import { Customer } from '../models/Customer.model';
import { CreateBookingDTO } from '../dto/booking.dto';

const VALID_TRANSITIONS: Record<BookingStatus, BookingStatus[]> = {
  PENDING:     ['CONFIRMED', 'CANCELLED'],
  CONFIRMED:   ['ASSIGNED', 'CANCELLED'],
  ASSIGNED:    ['IN_PROGRESS', 'CANCELLED'],
  IN_PROGRESS: ['COMPLETED', 'CANCELLED'],
  COMPLETED:   [],
  CANCELLED:   [],
};

export class BookingService {
  async createBooking(data: CreateBookingDTO) {
    const [customer] = await Customer.findOrCreate({
      where: { email: data.email },
      defaults: {
        name:    data.customerName,
        email:   data.email,
        phone:   data.phone,
        address: data.address,
      },
    });

    const booking = await bookingRepository.create({
      customerId:      customer.id,
      collectionType:  data.collectionType,
      pickupAddress:   data.pickupAddress,
      deliveryAddress: data.deliveryAddress,
      packageCount:    data.packageCount,
      scheduledAt:     new Date(data.scheduledAt),
      notes:           data.notes,
      status:          'PENDING',
      priority:        data.packageCount > 100 ? 'HIGH' : 'NORMAL',
    });

    await activityService.log({
      bookingId: booking.id,
      action:    'BOOKING_CREATED',
      toValue:   booking.status,
    });

    return { ...booking.toJSON(), customer };
  }

  async listBookings(filters: BookingFilters) {
    return bookingRepository.findAll(filters);
  }

  async getBookingById(id: string) {
    const booking = await bookingRepository.findByIdWithTimeline(id);
    if (!booking) throw new AppError('Booking not found', 404);
    return booking;
  }

  async updateStatus(id: string, newStatus: BookingStatus) {
    const booking = await bookingRepository.findById(id);
    if (!booking) throw new AppError('Booking not found', 404);

    const allowed = VALID_TRANSITIONS[booking.status];
    if (!allowed.includes(newStatus)) {
      throw new AppError(
        `Cannot transition from ${booking.status} to ${newStatus}`,
        400
      );
    }

    const prevStatus = booking.status;
    await bookingRepository.updateStatus(id, newStatus);

    // When booking is COMPLETED or CANCELLED, free up the assigned driver
    if (newStatus === 'COMPLETED' || newStatus === 'CANCELLED') {
      const assignment = await assignmentRepository.findByBookingId(id);
      if (assignment) {
        await driverRepository.updateStatus(assignment.driverId, 'AVAILABLE');

        // Mark assignment as completed if finishing successfully
        if (newStatus === 'COMPLETED') {
          await assignmentRepository.complete(assignment.id);
        }
      }
    }

    await activityService.log({
      bookingId: id,
      action:    newStatus === 'CANCELLED' ? 'BOOKING_CANCELLED' : 'STATUS_CHANGED',
      fromValue: prevStatus,
      toValue:   newStatus,
    });

    return { ...booking.toJSON(), status: newStatus };
  }

  async cancelBooking(id: string) {
    return this.updateStatus(id, 'CANCELLED');
  }
}

export const bookingService = new BookingService();