import { ActivityLog, ActivityAction } from '../models/ActivityLog.model';

export interface LogActivityInput {
  bookingId: string;
  action: ActivityAction;
  fromValue?: string;
  toValue?: string;
  performedBy?: string;
  metadata?: object;
}

export class ActivityRepository {
  async create(data: LogActivityInput): Promise<ActivityLog> {
    return ActivityLog.create(data as any);
  }

  async findByBookingId(bookingId: string): Promise<ActivityLog[]> {
    return ActivityLog.findAll({
      where: { bookingId },
      order: [['createdAt', 'ASC']],
    });
  }
}

export const activityRepository = new ActivityRepository();
