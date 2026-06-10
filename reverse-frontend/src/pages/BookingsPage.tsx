import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useBookings } from '../hooks/useBookings';
import { BookingTable } from '../components/bookings/BookingTable';
import { BookingFilters } from '../components/bookings/BookingFilters';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/ui/Button';
import type { BookingFilters as FiltersType } from '../types';

export function BookingsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Initialise from URL params so deep-linking works (e.g. ?priority=HIGH from alert)
  const [filters, setFilters] = useState<FiltersType>({
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    order: 'desc',
    priority: (searchParams.get('priority') as FiltersType['priority']) || '',
    status: (searchParams.get('status') as FiltersType['status']) || '',
    search: searchParams.get('search') || '',
  });

  const { data, isLoading, isError } = useBookings(filters);

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Bookings"
        subtitle={data ? `${data.meta.total} bookings total` : 'Manage all collection bookings'}
        action={
          <Button onClick={() => navigate('/bookings/new')}>
            + New Booking
          </Button>
        }
      />

      <BookingFilters filters={filters} onChange={setFilters} />

      <BookingTable
        data={data}
        isLoading={isLoading}
        isError={isError}
        onPageChange={(page) => setFilters((f) => ({ ...f, page }))}
      />
    </div>
  );
}
