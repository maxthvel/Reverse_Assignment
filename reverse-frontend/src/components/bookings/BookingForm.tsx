import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useCreateBooking } from '../../hooks/useBookingDetail';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

const COLLECTION_TYPES = [
  { value: 'HOUSEHOLD',       label: 'Household' },
  { value: 'APARTMENT',       label: 'Apartment' },
  { value: 'OFFICE',          label: 'Office' },
  { value: 'RETAIL_STORE',    label: 'Retail Store' },
  { value: 'RESTAURANT_CAFE', label: 'Restaurant / Cafe' },
] as const;

const bookingSchema = z.object({
  // Customer
  customerName:    z.string().min(2, 'Customer name is required'),
  phone:           z.string().min(7, 'Phone number is required'),
  email:           z.string().email('Invalid email address'),
  address:         z.string().min(5, 'Address is too short'),
  // Booking
  collectionType:  z.enum(['HOUSEHOLD', 'APARTMENT', 'OFFICE', 'RETAIL_STORE', 'RESTAURANT_CAFE'], {
                     errorMap: () => ({ message: 'Please select a collection type' }),
                   }),
  pickupAddress:   z.string().min(5, 'Pickup address is too short'),
  deliveryAddress: z.string().min(5, 'Delivery address is too short'),
  packageCount:    z.coerce
                     .number({ invalid_type_error: 'Must be a number' })
                     .int('Must be a whole number')
                     .positive('Must be greater than 0')
                     .max(10000, 'Cannot exceed 10,000 packages'),
  scheduledAt:     z.string().min(1, 'Please select a scheduled date and time'),
  notes:           z.string().max(500, 'Notes cannot exceed 500 characters').optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export function BookingForm() {
  const navigate = useNavigate();
  const { mutate: createBooking, isPending, error } = useCreateBooking();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { packageCount: 1 },
  });

  const packageCount = watch('packageCount');
  const isHighPriority = Number(packageCount) > 100;

  const onSubmit = (data: BookingFormValues) => {
    createBooking(
      { ...data, scheduledAt: new Date(data.scheduledAt).toISOString() },
      { onSuccess: (booking) => navigate(`/bookings/${booking.id}`) }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="space-y-6">

        {/* ── Customer Details ── */}
        <Card>
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">
            Customer Details
          </h2>
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input
                label="Customer Name"
                placeholder="e.g. Raj Logistics Pvt Ltd"
                error={errors.customerName?.message}
                {...register('customerName')}
              />
              <Input
                label="Phone Number"
                placeholder="+91-9876543210"
                error={errors.phone?.message}
                {...register('phone')}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input
                label="Email"
                type="email"
                placeholder="ops@company.com"
                hint="Used to find or create the customer record"
                error={errors.email?.message}
                {...register('email')}
              />
              <Input
                label="Address"
                placeholder="Customer address"
                error={errors.address?.message}
                {...register('address')}
              />
            </div>
          </div>
        </Card>

        {/* ── Booking Details ── */}
        <Card>
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">
            Booking Details
          </h2>
          <div className="space-y-5">

            {/* Collection Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Collection Type
              </label>
              <select
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white"
                {...register('collectionType')}
              >
                <option value="">Select collection type…</option>
                {COLLECTION_TYPES.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
              {errors.collectionType && (
                <p className="mt-1 text-xs text-red-600">{errors.collectionType.message}</p>
              )}
            </div>

            {/* Addresses */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input
                label="Pickup Address"
                placeholder="Warehouse address, city"
                error={errors.pickupAddress?.message}
                {...register('pickupAddress')}
              />
              <Input
                label="Delivery Address"
                placeholder="Destination address, city"
                error={errors.deliveryAddress?.message}
                {...register('deliveryAddress')}
              />
            </div>

            {/* Package Count */}
            <div>
              <Input
                type="number"
                label="Estimated Package Count"
                placeholder="1"
                min={1}
                error={errors.packageCount?.message}
                {...register('packageCount')}
              />
              {isHighPriority && (
                <div className="mt-2 flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  <span className="text-base">🚨</span>
                  <p className="text-xs font-semibold text-red-700">
                    HIGH PRIORITY — Bookings over 100 packages are automatically escalated
                  </p>
                </div>
              )}
            </div>

            {/* Scheduled At */}
            <Input
              type="datetime-local"
              label="Preferred Collection Date"
              error={errors.scheduledAt?.message}
              {...register('scheduledAt')}
            />

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <textarea
                rows={3}
                placeholder="Special handling instructions, fragile items, etc."
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                {...register('notes')}
              />
              {errors.notes && (
                <p className="mt-1 text-xs text-red-600">{errors.notes.message}</p>
              )}
            </div>
          </div>
        </Card>

        {/* API error */}
        {error && (
          <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3">
            <p className="text-sm text-red-700 font-medium">Failed to create booking</p>
            <p className="text-xs text-red-600 mt-0.5">{error.message}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <Button type="button" variant="outline" onClick={() => navigate('/bookings')}>
            Cancel
          </Button>
          <Button type="submit" loading={isPending}>
            Create Booking
          </Button>
        </div>

      </div>
    </form>
  );
}