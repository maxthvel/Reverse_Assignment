import { Customer } from './Customer.model';
import { Booking } from './Booking.model';
import { Driver } from './Driver.model';
import { Assignment } from './Assignment.model';
import { ActivityLog } from './ActivityLog.model';

// Customer ↔ Booking
Customer.hasMany(Booking, { foreignKey: 'customerId', as: 'bookings' });
Booking.belongsTo(Customer, { foreignKey: 'customerId', as: 'customer' });

// Booking ↔ Assignment
Booking.hasOne(Assignment, { foreignKey: 'bookingId', as: 'assignment' });
Assignment.belongsTo(Booking, { foreignKey: 'bookingId', as: 'booking' });

// Driver ↔ Assignment
Driver.hasMany(Assignment, { foreignKey: 'driverId', as: 'assignments' });
Assignment.belongsTo(Driver, { foreignKey: 'driverId', as: 'driver' });

// Booking ↔ ActivityLog
Booking.hasMany(ActivityLog, { foreignKey: 'bookingId', as: 'activityLogs' });
ActivityLog.belongsTo(Booking, { foreignKey: 'bookingId', as: 'booking' });

export { Customer, Booking, Driver, Assignment, ActivityLog };
