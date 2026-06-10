import { Driver, DriverAttributes, DriverStatus } from '../models/Driver.model';

export class DriverRepository {
  async create(data: Omit<DriverAttributes, 'id'>): Promise<Driver> {
    return Driver.create(data as any);
  }

  async findAll(status?: DriverStatus): Promise<Driver[]> {
    const where: any = {};
    if (status) where.status = status;
    return Driver.findAll({ where });
  }

  async findAvailable(): Promise<Driver[]> {
    return Driver.findAll({ where: { status: 'AVAILABLE' } });
  }

  async findById(id: string): Promise<Driver | null> {
    return Driver.findByPk(id);
  }

  async updateStatus(id: string, status: DriverStatus): Promise<[number]> {
    return Driver.update({ status }, { where: { id } });
  }
}

export const driverRepository = new DriverRepository();
