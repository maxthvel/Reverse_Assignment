import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

export type DriverStatus = 'AVAILABLE' | 'BUSY' | 'OFFLINE';

export interface DriverAttributes {
  id: string;
  name: string;
  phone: string;
  vehicleNumber: string;
  status: DriverStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

type DriverCreationAttributes = Optional<DriverAttributes, 'id'>;

export class Driver
  extends Model<DriverAttributes, DriverCreationAttributes>
  implements DriverAttributes
{
  public id!: string;
  public name!: string;
  public phone!: string;
  public vehicleNumber!: string;
  public status!: DriverStatus;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Driver.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING(100), allowNull: false },
    phone: { type: DataTypes.STRING(20), allowNull: false },
    vehicleNumber: { type: DataTypes.STRING(20), allowNull: false, unique: true },
    status: {
      type: DataTypes.ENUM('AVAILABLE', 'BUSY', 'OFFLINE'),
      defaultValue: 'AVAILABLE',
    },
  },
  {
    sequelize,
    tableName: 'drivers',
    timestamps: true,
  }
);
