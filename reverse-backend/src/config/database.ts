import { Sequelize } from 'sequelize';
import { env } from './env';

export const sequelize = new Sequelize({
  dialect: 'mysql',
  host: env.DB_HOST,
  port: env.DB_PORT,
  database: env.DB_NAME,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  logging: env.NODE_ENV === 'development' ? console.log : false,
  define: {
    underscored: false,
    timestamps: true,
  },
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');
    await sequelize.sync({ alter: env.NODE_ENV === 'development' });
    console.log('✅ Models synced');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
};
