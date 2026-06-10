import { useNavigate } from 'react-router-dom';
import { BookingForm } from '../components/bookings/BookingForm';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';

export function NewBookingPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <PageHeader
        title="New Booking"
        subtitle="Create a collection booking for a customer"
        action={
          <Button variant="outline" onClick={() => navigate('/bookings')}>
            ← Back to Bookings
          </Button>
        }
      />
      <BookingForm />
    </div>
  );
}
