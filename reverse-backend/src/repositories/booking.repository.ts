import { Op, WhereOptions } from 'sequelize';
import { Booking, BookingAttributes, BookingStatus, PriorityLevel, CollectionType } from '../models/Booking.model';
import { Customer } from '../models/Customer.model';
import { Assignment } from '../models/Assignment.model';
import { Driver } from '../models/Driver.model';
import { ActivityLog } from '../models/ActivityLog.model';

export interface BookingFilters {
  status?:         BookingStatus;
  priority?:       PriorityLevel;
  collectionType?: CollectionType;
  search?:         string;
  page?:           number;
  limit?:          number;
  sortBy?:         string;
  order?:          'asc' | 'desc';
}

export class BookingRepository {
  async create(data: Omit<BookingAttributes, 'id'>): Promise<Booking> {
    return Booking.create(data as any);
  }

  async findAll(filters: BookingFilters) {
    const {
      status,
      priority,
      collectionType,
      search,
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      order = 'desc',
    } = filters;

    const where: WhereOptions = {};
    if (status)         where.status         = status;
    if (priority)       where.priority       = priority;
    if (collectionType) where.collectionType = collectionType;
    if (search) {
      (where as any)[Op.or] = [
        { pickupAddress:   { [Op.like]: `%${search}%` } },
        { deliveryAddress: { [Op.like]: `%${search}%` } },
      ];
    }

    const { count, rows } = await Booking.findAndCountAll({
      where,
      include: [
        { model: Customer, as: 'customer', attributes: ['id', 'name', 'email', 'phone'] },
        {
          model: Assignment,
          as: 'assignment',
          include: [{ model: Driver, as: 'driver', attributes: ['id', 'name', 'vehicleNumber'] }],
        },
      ],
      limit,
      offset: (page - 1) * limit,
      order: [[sortBy, order.toUpperCase()]],
      distinct: true,
    });

    return {
      items: rows,
      meta: { total: count, page, limit, totalPages: Math.ceil(count / limit) },
    };
  }

  async findByIdWithTimeline(id: string): Promise<Booking | null> {
    return Booking.findByPk(id, {
      include: [
        { model: Customer, as: 'customer' },
        {
          model: Assignment,
          as: 'assignment',
          include: [{ model: Driver, as: 'driver' }],
        },
        {
          model: ActivityLog,
          as: 'activityLogs',
          separate: true,
          order: [['createdAt', 'ASC']],
        },
      ],
    });
  }

  async updateStatus(id: string, status: BookingStatus): Promise<[number]> {
    return Booking.update({ status }, { where: { id } });
  }

  async findById(id: string): Promise<Booking | null> {
    return Booking.findByPk(id);
  }
}

export const bookingRepository = new BookingRepository();
