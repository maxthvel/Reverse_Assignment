import { driverRepository } from '../repositories/driver.repository';
import { AppError } from '../middlewares/error.middleware';
import { DriverStatus } from '../models/Driver.model';
import { CreateDriverDTO } from '../dto/driver.dto';

export class DriverService {
  async createDriver(data: CreateDriverDTO) {
    return driverRepository.create(data as any);
  }

  async listDrivers(status?: DriverStatus) {
    return driverRepository.findAll(status);
  }

  async getAvailableDrivers() {
    return driverRepository.findAvailable();
  }

  async updateStatus(id: string, status: DriverStatus) {
    const driver = await driverRepository.findById(id);
    if (!driver) throw new AppError('Driver not found', 404);
    await driverRepository.updateStatus(id, status);
    return { ...driver.toJSON(), status };
  }
}

export const driverService = new DriverService();
