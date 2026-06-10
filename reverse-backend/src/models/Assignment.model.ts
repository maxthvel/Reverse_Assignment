import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

export interface AssignmentAttributes {
  id: string;
  bookingId: string;
  driverId: string;
  assignedAt: Date;
  completedAt?: Date;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type AssignmentCreationAttributes = Optional<AssignmentAttributes, 'id' | 'completedAt' | 'notes'>;

export class Assignment
  extends Model<AssignmentAttributes, AssignmentCreationAttributes>
  implements AssignmentAttributes
{
  public id!: string;
  public bookingId!: string;
  public driverId!: string;
  public assignedAt!: Date;
  public completedAt?: Date;
  public notes?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Assignment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    bookingId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true, // one booking → one assignment
    },
    driverId: { type: DataTypes.UUID, allowNull: false },
    assignedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    completedAt: { type: DataTypes.DATE, allowNull: true },
    notes: { type: DataTypes.TEXT, allowNull: true },
  },
  {
    sequelize,
    tableName: 'assignments',
    timestamps: true,
  }
);
