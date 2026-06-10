import { Assignment, AssignmentAttributes } from '../models/Assignment.model';
import { Driver } from '../models/Driver.model';

export class AssignmentRepository {
  async create(data: Omit<AssignmentAttributes, 'id' | 'completedAt'>): Promise<Assignment> {
    return Assignment.create(data as any);
  }

  async findById(id: string): Promise<Assignment | null> {
    return Assignment.findByPk(id, {
      include: [{ model: Driver, as: 'driver' }],
    });
  }

  async findByBookingId(bookingId: string): Promise<Assignment | null> {
    return Assignment.findOne({ where: { bookingId } });
  }

  async complete(id: string): Promise<[number]> {
    return Assignment.update({ completedAt: new Date() }, { where: { id } });
  }

  async delete(id: string): Promise<number> {
    return Assignment.destroy({ where: { id } });
  }
}

export const assignmentRepository = new AssignmentRepository();
