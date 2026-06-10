import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

export type BookingStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'ASSIGNED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED';

export type PriorityLevel = 'NORMAL' | 'HIGH';

export type CollectionType =
  | 'HOUSEHOLD'
  | 'APARTMENT'
  | 'OFFICE'
  | 'RETAIL_STORE'
  | 'RESTAURANT_CAFE';

export interface BookingAttributes {
  id: string;
  customerId: string;
  collectionType: CollectionType;
  pickupAddress: string;
  deliveryAddress: string;
  packageCount: number;
  status: BookingStatus;
  priority: PriorityLevel;
  scheduledAt: Date;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type BookingCreationAttributes = Optional<BookingAttributes, 'id' | 'notes' | 'status' | 'priority'>;

export class Booking
  extends Model<BookingAttributes, BookingCreationAttributes>
  implements BookingAttributes
{
  public id!: string;
  public customerId!: string;
  public collectionType!: CollectionType;
  public pickupAddress!: string;
  public deliveryAddress!: string;
  public packageCount!: number;
  public status!: BookingStatus;
  public priority!: PriorityLevel;
  public scheduledAt!: Date;
  public notes?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Booking.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    customerId: { type: DataTypes.UUID, allowNull: false },
    collectionType: {
      type: DataTypes.ENUM('HOUSEHOLD', 'APARTMENT', 'OFFICE', 'RETAIL_STORE', 'RESTAURANT_CAFE'),
      allowNull: false,
    },
    pickupAddress: { type: DataTypes.TEXT, allowNull: false },
    deliveryAddress: { type: DataTypes.TEXT, allowNull: false },
    packageCount: { type: DataTypes.INTEGER, allowNull: false },
    status: {
      type: DataTypes.ENUM('PENDING', 'CONFIRMED', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'),
      defaultValue: 'PENDING',
    },
    priority: {
      type: DataTypes.ENUM('NORMAL', 'HIGH'),
      defaultValue: 'NORMAL',
    },
    scheduledAt: { type: DataTypes.DATE, allowNull: false },
    notes: { type: DataTypes.TEXT, allowNull: true },
  },
  {
    sequelize,
    tableName: 'bookings',
    timestamps: true,
    hooks: {
      beforeSave: (booking) => {
        if (booking.packageCount > 100) {
          booking.priority = 'HIGH';
        }
      },
    },
  }
);
