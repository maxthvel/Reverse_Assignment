import { assignmentRepository } from '../repositories/assignment.repository';
import { bookingRepository } from '../repositories/booking.repository';
import { driverRepository } from '../repositories/driver.repository';
import { activityService } from './activity.service';
import { AppError } from '../middlewares/error.middleware';
import { CreateAssignmentDTO } from '../dto/assignment.dto';

export class AssignmentService {
  async createAssignment(data: CreateAssignmentDTO) {
    // Validate booking exists and is in a valid state
    const booking = await bookingRepository.findById(data.bookingId);
    if (!booking) throw new AppError('Booking not found', 404);
    if (!['PENDING', 'CONFIRMED'].includes(booking.status)) {
      throw new AppError(`Booking in status ${booking.status} cannot be assigned`, 400);
    }

    // Check no existing assignment
    const existing = await assignmentRepository.findByBookingId(data.bookingId);
    if (existing) throw new AppError('Booking already has an assignment', 409);

    // Validate driver exists and is available
    const driver = await driverRepository.findById(data.driverId);
    if (!driver) throw new AppError('Driver not found', 404);
    if (driver.status !== 'AVAILABLE') {
      throw new AppError(`Driver is not available (current status: ${driver.status})`, 400);
    }

    // Create assignment
    const assignment = await assignmentRepository.create({
      bookingId: data.bookingId,
      driverId: data.driverId,
      assignedAt: new Date(),
      notes: data.notes,
    });

    // Update booking status to ASSIGNED
    await bookingRepository.updateStatus(data.bookingId, 'ASSIGNED');

    // Update driver status to BUSY
    await driverRepository.updateStatus(data.driverId, 'BUSY');

    // Log activity
    await activityService.log({
      bookingId: data.bookingId,
      action: 'DRIVER_ASSIGNED',
      toValue: `${driver.name} (${driver.vehicleNumber})`,
    });

    return { ...assignment.toJSON(), driver };
  }

  async unassign(id: string) {
    const assignment = await assignmentRepository.findById(id);
    if (!assignment) throw new AppError('Assignment not found', 404);

    // Revert booking status
    await bookingRepository.updateStatus(assignment.bookingId, 'CONFIRMED');

    // Free up driver
    await driverRepository.updateStatus(assignment.driverId, 'AVAILABLE');

    await activityService.log({
      bookingId: assignment.bookingId,
      action: 'DRIVER_UNASSIGNED',
    });

    await assignmentRepository.delete(id);
    return { message: 'Assignment removed successfully' };
  }

  async complete(id: string) {
    const assignment = await assignmentRepository.findById(id);
    if (!assignment) throw new AppError('Assignment not found', 404);

    await assignmentRepository.complete(id);
    await bookingRepository.updateStatus(assignment.bookingId, 'COMPLETED');
    await driverRepository.updateStatus(assignment.driverId, 'AVAILABLE');

    await activityService.log({
      bookingId: assignment.bookingId,
      action: 'STATUS_CHANGED',
      fromValue: 'IN_PROGRESS',
      toValue: 'COMPLETED',
    });

    return { message: 'Assignment completed successfully' };
  }
}

export const assignmentService = new AssignmentService();
