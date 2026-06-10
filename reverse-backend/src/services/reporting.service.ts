import { Op, fn, col } from 'sequelize';
import { Booking } from '../models/Booking.model';
import { Driver } from '../models/Driver.model';
import { Assignment } from '../models/Assignment.model';

export class ReportingService {
  async getDashboardMetrics() {
    const [
      totalBookings,
      pendingBookings,
      highPriorityBookings,
      completedToday,
      availableDrivers,
      assignedBookings,
    ] = await Promise.all([
      Booking.count(),
      Booking.count({ where: { status: 'PENDING' } }),
      Booking.count({ where: { priority: 'HIGH' } }),
      Booking.count({
        where: {
          status: 'COMPLETED',
          updatedAt: { [Op.gte]: new Date(new Date().setHours(0, 0, 0, 0)) },
        },
      }),
      Driver.count({ where: { status: 'AVAILABLE' } }),
      Booking.count({ where: { status: ['ASSIGNED', 'IN_PROGRESS', 'COMPLETED'] } }),
    ]);

    const assignmentRate =
      totalBookings > 0
        ? parseFloat((assignedBookings / totalBookings).toFixed(2))
        : 0;

    return {
      totalBookings,
      pendingBookings,
      highPriorityBookings,
      completedToday,
      availableDrivers,
      assignmentRate,
    };
  }

  async getBookingsByStatus() {
    return Booking.findAll({
      attributes: ['status', [fn('COUNT', col('id')), 'count']],
      group: ['status'],
      raw: true,
    });
  }

  async getDriverUtilization() {
    return Driver.findAll({
      include: [
        {
          model: Assignment,
          as: 'assignments',
          attributes: [],
        },
      ],
      attributes: [
        'id',
        'name',
        'vehicleNumber',
        'status',
        [fn('COUNT', col('assignments.id')), 'totalAssignments'],
      ],
      group: ['Driver.id'],
      raw: true,
      nest: true,
    });
  }

  async getHighPriorityStats() {
    const [total, pending, assigned, completed] = await Promise.all([
      Booking.count({ where: { priority: 'HIGH' } }),
      Booking.count({ where: { priority: 'HIGH', status: 'PENDING' } }),
      Booking.count({ where: { priority: 'HIGH', status: ['ASSIGNED', 'IN_PROGRESS'] } }),
      Booking.count({ where: { priority: 'HIGH', status: 'COMPLETED' } }),
    ]);

    return { total, pending, assigned, completed };
  }
}

export const reportingService = new ReportingService();
