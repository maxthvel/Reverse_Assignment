import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

export interface CustomerAttributes {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type CustomerCreationAttributes = Optional<CustomerAttributes, 'id'>;

export class Customer
  extends Model<CustomerAttributes, CustomerCreationAttributes>
  implements CustomerAttributes
{
  public id!: string;
  public name!: string;
  public email!: string;
  public phone!: string;
  public address!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Customer.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING(100), allowNull: false },
    email: { type: DataTypes.STRING(150), allowNull: false, unique: true },
    phone: { type: DataTypes.STRING(20), allowNull: false },
    address: { type: DataTypes.TEXT, allowNull: false },
  },
  {
    sequelize,
    tableName: 'customers',
    timestamps: true,
  }
);
