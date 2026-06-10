import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

export type ActivityAction =
  | 'BOOKING_CREATED'
  | 'STATUS_CHANGED'
  | 'DRIVER_ASSIGNED'
  | 'DRIVER_UNASSIGNED'
  | 'PRIORITY_ESCALATED'
  | 'BOOKING_CANCELLED';

export interface ActivityLogAttributes {
  id: string;
  bookingId: string;
  action: ActivityAction;
  fromValue?: string;
  toValue?: string;
  performedBy?: string;
  metadata?: object;
  createdAt?: Date;
}

type ActivityLogCreationAttributes = Optional<
  ActivityLogAttributes,
  'id' | 'fromValue' | 'toValue' | 'performedBy' | 'metadata'
>;

export class ActivityLog
  extends Model<ActivityLogAttributes, ActivityLogCreationAttributes>
  implements ActivityLogAttributes
{
  public id!: string;
  public bookingId!: string;
  public action!: ActivityAction;
  public fromValue?: string;
  public toValue?: string;
  public performedBy?: string;
  public metadata?: object;
  public readonly createdAt!: Date;
}

ActivityLog.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    bookingId: { type: DataTypes.UUID, allowNull: false },
    action: {
      type: DataTypes.ENUM(
        'BOOKING_CREATED',
        'STATUS_CHANGED',
        'DRIVER_ASSIGNED',
        'DRIVER_UNASSIGNED',
        'PRIORITY_ESCALATED',
        'BOOKING_CANCELLED'
      ),
      allowNull: false,
    },
    fromValue: { type: DataTypes.STRING, allowNull: true },
    toValue: { type: DataTypes.STRING, allowNull: true },
    performedBy: { type: DataTypes.STRING, allowNull: true },
    metadata: { type: DataTypes.JSON, allowNull: true },
  },
  {
    sequelize,
    tableName: 'activity_logs',
    timestamps: true,
    updatedAt: false,
  }
);
