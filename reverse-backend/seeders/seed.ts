import 'dotenv/config';
import { sequelize } from '../src/config/database';
import '../src/models/index'; // register associations
import { Customer } from '../src/models/Customer.model';
import { Driver } from '../src/models/Driver.model';
import { Booking } from '../src/models/Booking.model';
import { Assignment } from '../src/models/Assignment.model';
import { ActivityLog } from '../src/models/ActivityLog.model';

async function seed() {
  await sequelize.sync({ force: true });
  console.log('📦 Tables dropped and recreated');

  // Create customer
  const customer = await Customer.create({
    name: 'Raj Logistics Pvt Ltd',
    email: 'ops@rajlogistics.com',
    phone: '+91-9876543210',
    address: 'Industrial Area Phase 2, Chennai',
  });

  // Create drivers
  const [karthik, priya] = await Driver.bulkCreate([
    { name: 'Karthik M', phone: '+91-9000000001', vehicleNumber: 'TN01AB1234', status: 'AVAILABLE' },
    { name: 'Priya S',   phone: '+91-9000000002', vehicleNumber: 'TN02CD5678', status: 'AVAILABLE' },
    { name: 'Suresh K',  phone: '+91-9000000003', vehicleNumber: 'KA03EF9012', status: 'BUSY' },
  ]);

  // Create bookings (mix of statuses and priorities)
  const statuses = ['PENDING', 'CONFIRMED', 'ASSIGNED', 'COMPLETED'] as const;
  const bookings = await Booking.bulkCreate(
    Array.from({ length: 20 }, (_, i) => ({
      customerId: customer.id,
      pickupAddress: `Warehouse ${i + 1}, Chennai`,
      deliveryAddress: `Client ${i + 1}, Bangalore`,
      packageCount: i % 4 === 0 ? 150 : 30 + i,
      status: statuses[i % 4],
      priority: (i % 4 === 0 ? 'HIGH' : 'NORMAL') as 'HIGH' | 'NORMAL',
      scheduledAt: new Date(Date.now() + i * 86400000),
    }))
  );

  // Assign a driver to the ASSIGNED booking
  const assignedBooking = bookings.find((b) => b.status === 'ASSIGNED');
  if (assignedBooking && karthik) {
    await Assignment.create({
      bookingId: assignedBooking.id,
      driverId: karthik.id,
      assignedAt: new Date(),
      notes: 'Priority delivery',
    });
    await Driver.update({ status: 'BUSY' }, { where: { id: karthik.id } });
  }

  // Seed activity logs for first booking
  if (bookings[0]) {
    await ActivityLog.bulkCreate([
      {
        bookingId: bookings[0].id,
        action: 'BOOKING_CREATED',
        toValue: 'PENDING',
      },
      {
        bookingId: bookings[0].id,
        action: 'STATUS_CHANGED',
        fromValue: 'PENDING',
        toValue: 'CONFIRMED',
      },
    ]);
  }

  console.log('✅ Seed complete');
  console.log(`   👤 1 customer created`);
  console.log(`   🚗 3 drivers created`);
  console.log(`   📦 ${bookings.length} bookings created`);
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
