import { activityRepository, LogActivityInput } from '../repositories/activity.repository';

export class ActivityService {
  async log(input: LogActivityInput) {
    return activityRepository.create(input);
  }

  async getByBookingId(bookingId: string) {
    return activityRepository.findByBookingId(bookingId);
  }
}

export const activityService = new ActivityService();
