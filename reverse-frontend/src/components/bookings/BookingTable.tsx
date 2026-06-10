import { useNavigate } from 'react-router-dom';
import type { Booking, PaginatedResponse } from '../../types';
import { BookingStatusBadge, PriorityBadge } from './BookingStatusBadge';
import { Spinner } from '../ui/Spinner';
import { Pagination } from '../ui/Pagination';
import { EmptyState } from '../ui/EmptyState';
import { formatDate, truncateAddress } from '../../utils/formatters';

interface BookingTableProps {
  data?: PaginatedResponse<Booking>;
  isLoading: boolean;
  isError: boolean;
  onPageChange: (page: number) => void;
}

const TH = ({ children }: { children: React.ReactNode }) => (
  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
    {children}
  </th>
);

export function BookingTable({ data, isLoading, isError, onPageChange }: BookingTableProps) {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  if (isError) {
    return (
      <EmptyState
        icon="⚠️"
        message="Failed to load bookings"
        description="Check your connection and try refreshing."
      />
    );
  }

  if (!data?.items.length) {
    return (
      <EmptyState
        message="No bookings found"
        description="Try adjusting your filters or create a new booking."
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm bg-white">
        <table className="min-w-full divide-y divide-gray-100">
          <thead className="bg-gray-50">
            <tr>
              <TH>Customer</TH>
              <TH>Pickup</TH>
              <TH>Delivery</TH>
              <TH>Packages</TH>
              <TH>Status</TH>
              <TH>Priority</TH>
              <TH>Driver</TH>
              <TH>Scheduled</TH>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.items.map((booking) => (
              <tr
                key={booking.id}
                onClick={() => navigate(`/bookings/${booking.id}`)}
                className={`cursor-pointer hover:bg-blue-50/40 transition-colors group ${
                  booking.priority === 'HIGH'
                    ? 'border-l-[3px] border-l-red-400'
                    : ''
                }`}
              >
                <td className="px-4 py-3.5">
                  <p className="text-sm font-medium text-gray-900">
                    {booking.customer?.name ?? '—'}
                  </p>
                  <p className="text-xs text-gray-400">{booking.customer?.email ?? ''}</p>
                </td>
                <td className="px-4 py-3.5 text-sm text-gray-600">
                  {truncateAddress(booking.pickupAddress)}
                </td>
                <td className="px-4 py-3.5 text-sm text-gray-600">
                  {truncateAddress(booking.deliveryAddress)}
                </td>
                <td className="px-4 py-3.5 text-sm font-mono text-gray-800 font-semibold">
                  {booking.packageCount}
                </td>
                <td className="px-4 py-3.5">
                  <BookingStatusBadge status={booking.status} />
                </td>
                <td className="px-4 py-3.5">
                  <PriorityBadge priority={booking.priority} />
                </td>
                <td className="px-4 py-3.5 text-sm text-gray-600">
                  {booking.assignment?.driver?.name ?? (
                    <span className="text-gray-400 italic">Unassigned</span>
                  )}
                </td>
                <td className="px-4 py-3.5 text-sm text-gray-500 whitespace-nowrap">
                  {formatDate(booking.scheduledAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination meta={data.meta} onPageChange={onPageChange} />
    </div>
  );
}
