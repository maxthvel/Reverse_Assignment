import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBookingDetail, useUpdateStatus } from '../hooks/useBookingDetail';
import { useUnassignDriver } from '../hooks/useDrivers';
import { ActivityTimeline } from '../components/timeline/ActivityTimeline';
import { AssignDriverModal } from '../components/assignment/AssignDriverModal';
import { BookingStatusBadge, PriorityBadge } from '../components/bookings/BookingStatusBadge';
import { PageHeader } from '../components/layout/PageHeader';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Spinner } from '../components/ui/Spinner';
import { BOOKING_STATUS_CONFIG, DRIVER_STATUS_CONFIG } from '../utils/statusConfig';
import { formatDate } from '../utils/formatters';
import type { BookingStatus } from '../types';

export function BookingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showAssignModal, setShowAssignModal] = useState(false);

  const { data: booking, isLoading, isError } = useBookingDetail(id!);
  const { mutate: updateStatus, isPending: updatingStatus } = useUpdateStatus(id!);
  const { mutate: unassign, isPending: unassigning } = useUnassignDriver(id!);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-32">
        <Spinner size="lg" />
      </div>
    );
  }

  if (isError || !booking) {
    return (
      <div className="text-center py-20">
        <p className="text-lg font-medium text-gray-700">Booking not found</p>
        <Button variant="outline" onClick={() => navigate('/bookings')} className="mt-4">
          ← Back to Bookings
        </Button>
      </div>
    );
  }

  const statusConfig = BOOKING_STATUS_CONFIG[booking.status];
  const canAssign = ['CONFIRMED', 'ASSIGNED'].includes(booking.status);
  const hasAssignment = !!booking.assignment;

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title={`Booking #${booking.id.slice(0, 8).toUpperCase()}`}
        subtitle={`Created ${formatDate(booking.createdAt)}`}
        action={
          <Button variant="outline" onClick={() => navigate('/bookings')}>
            ← All Bookings
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ── Left: Details (2/3 width) ── */}
        <div className="lg:col-span-2 space-y-5">

          {/* Status + Priority header */}
          <Card>
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <BookingStatusBadge status={booking.status} />
                <PriorityBadge priority={booking.priority} />
              </div>

              {/* Status transition buttons */}
              <div className="flex gap-2 flex-wrap">
                {statusConfig.nextStates.map((nextStatus) => (
                  <Button
                    key={nextStatus}
                    size="sm"
                    variant={nextStatus === 'CANCELLED' ? 'danger' : 'outline'}
                    loading={updatingStatus}
                    onClick={() => updateStatus(nextStatus as BookingStatus)}
                  >
                    → {BOOKING_STATUS_CONFIG[nextStatus as BookingStatus].label}
                  </Button>
                ))}
              </div>
            </div>
          </Card>

          {/* Booking details */}
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Booking Details</h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <DetailRow label="Customer" value={booking.customer?.name ?? '—'} />
              <DetailRow label="Email" value={booking.customer?.email ?? '—'} />
              <DetailRow label="Phone" value={booking.customer?.phone ?? '—'} />
              <DetailRow label="Package Count" value={String(booking.packageCount)} />
              <DetailRow label="Scheduled At" value={formatDate(booking.scheduledAt)} />
              <DetailRow label="Last Updated" value={formatDate(booking.updatedAt)} />
              <div className="col-span-2">
                <DetailRow label="Pickup Address" value={booking.pickupAddress} />
              </div>
              <div className="col-span-2">
                <DetailRow label="Delivery Address" value={booking.deliveryAddress} />
              </div>
              {booking.notes && (
                <div className="col-span-2">
                  <DetailRow label="Notes" value={booking.notes} />
                </div>
              )}
            </div>
          </Card>

          {/* Driver / Assignment */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-700">Driver Assignment</h3>
              {canAssign && (
                <Button size="sm" onClick={() => setShowAssignModal(true)}>
                  {hasAssignment ? 'Reassign Driver' : 'Assign Driver'}
                </Button>
              )}
            </div>

            {hasAssignment ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-green-50 rounded-lg px-4 py-3 border border-green-100">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      🚛 {booking.assignment!.driver?.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {booking.assignment!.driver?.vehicleNumber} ·{' '}
                      {booking.assignment!.driver?.phone}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {booking.assignment!.driver && (
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          DRIVER_STATUS_CONFIG[booking.assignment!.driver.status].className
                        }`}
                      >
                        {DRIVER_STATUS_CONFIG[booking.assignment!.driver.status].label}
                      </span>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      loading={unassigning}
                      onClick={() => unassign(booking.assignment!.id)}
                    >
                      Unassign
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-gray-400">
                  Assigned {formatDate(booking.assignment!.assignedAt)}
                </p>
                {booking.assignment!.notes && (
                  <p className="text-xs text-gray-500 italic">
                    "{booking.assignment!.notes}"
                  </p>
                )}
              </div>
            ) : (
              <p className="text-sm text-gray-400 italic">No driver assigned yet.</p>
            )}
          </Card>
        </div>

        {/* ── Right: Timeline (1/3 width) ── */}
        <div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Activity Timeline</h3>
            <ActivityTimeline logs={booking.activityLogs ?? []} />
          </Card>
        </div>
      </div>

      <AssignDriverModal
        bookingId={id!}
        isOpen={showAssignModal}
        onClose={() => setShowAssignModal(false)}
      />
    </div>
  );
}

// ── Helper ──────────────────────────────────────

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">{label}</p>
      <p className="text-sm text-gray-800 mt-0.5">{value}</p>
    </div>
  );
}
