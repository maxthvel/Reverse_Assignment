import { useState } from 'react';
import { useDrivers } from '../hooks/useDrivers';
import { CreateDriverModal } from '../components/drivers/CreateDriverModal';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/Select';
import { Card } from '../components/ui/Card';
import { Spinner } from '../components/ui/Spinner';
import { EmptyState } from '../components/ui/EmptyState';
import { PageHeader } from '../components/layout/PageHeader';
import { DRIVER_STATUS_CONFIG } from '../utils/statusConfig';
import { formatDate } from '../utils/formatters';
import type { Driver, DriverStatus } from '../types';
import { UpdateDriverStatusModal } from '../components/drivers/UpdateDriverStatusModal';

const STATUS_FILTER_OPTIONS = [
  { value: '', label: 'All Statuses' },
  { value: 'AVAILABLE', label: 'Available' },
  { value: 'BUSY', label: 'Busy' },
  { value: 'OFFLINE', label: 'Offline' },
];

export function DriversPage() {
  const [statusFilter, setStatusFilter] = useState<DriverStatus | ''>('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingDriver, setEditingDriver] = useState<Driver | null>(null);

  const { data: drivers, isLoading, isError } = useDrivers();

  const filtered = drivers?.filter((d) =>
    statusFilter ? d.status === statusFilter : true
  );

  const counts = drivers
    ? {
        available: drivers.filter((d) => d.status === 'AVAILABLE').length,
        busy: drivers.filter((d) => d.status === 'BUSY').length,
        offline: drivers.filter((d) => d.status === 'OFFLINE').length,
      }
    : null;

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Drivers"
        subtitle={drivers ? `${drivers.length} drivers registered` : 'Manage your fleet'}
        action={
          <Button onClick={() => setShowCreateModal(true)}>
            + Register Driver
          </Button>
        }
      />

      {/* Summary row */}
      {counts && (
        <div className="grid grid-cols-3 gap-4">
          <button
            onClick={() => setStatusFilter(statusFilter === 'AVAILABLE' ? '' : 'AVAILABLE')}
            className={`rounded-xl p-4 text-center border transition-all ${
              statusFilter === 'AVAILABLE'
                ? 'bg-green-100 border-green-400 ring-2 ring-green-300'
                : 'bg-green-50 border-green-200 hover:bg-green-100'
            }`}
          >
            <p className="text-2xl font-bold text-green-700">{counts.available}</p>
            <p className="text-xs text-green-600 font-medium mt-1">Available</p>
          </button>

          <button
            onClick={() => setStatusFilter(statusFilter === 'BUSY' ? '' : 'BUSY')}
            className={`rounded-xl p-4 text-center border transition-all ${
              statusFilter === 'BUSY'
                ? 'bg-orange-100 border-orange-400 ring-2 ring-orange-300'
                : 'bg-orange-50 border-orange-200 hover:bg-orange-100'
            }`}
          >
            <p className="text-2xl font-bold text-orange-700">{counts.busy}</p>
            <p className="text-xs text-orange-600 font-medium mt-1">Busy</p>
          </button>

          <button
            onClick={() => setStatusFilter(statusFilter === 'OFFLINE' ? '' : 'OFFLINE')}
            className={`rounded-xl p-4 text-center border transition-all ${
              statusFilter === 'OFFLINE'
                ? 'bg-gray-200 border-gray-400 ring-2 ring-gray-300'
                : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
            }`}
          >
            <p className="text-2xl font-bold text-gray-600">{counts.offline}</p>
            <p className="text-xs text-gray-500 font-medium mt-1">Offline</p>
          </button>
        </div>
      )}

      {/* Filter row */}
      <div className="flex items-end gap-3">
        <div className="w-48">
          <Select
            label="Filter by Status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as DriverStatus | '')}
            options={STATUS_FILTER_OPTIONS}
          />
        </div>
        {statusFilter && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setStatusFilter('')}
          >
            Clear filter
          </Button>
        )}
        <p className="text-sm text-gray-400 ml-auto">
          {filtered?.length ?? 0} driver{filtered?.length !== 1 ? 's' : ''} shown
        </p>
      </div>

      {/* Driver grid */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <Spinner size="lg" />
        </div>
      ) : isError ? (
        <EmptyState icon="⚠️" message="Failed to load drivers" description="Check your connection and try refreshing." />
      ) : !filtered?.length ? (
        <EmptyState
          message={statusFilter ? `No ${statusFilter.toLowerCase()} drivers` : 'No drivers registered yet'}
          description={!statusFilter ? 'Click "Register Driver" to add your first driver.' : undefined}
          icon="🚛"
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((driver) => {
            const cfg = DRIVER_STATUS_CONFIG[driver.status];
            return (
              <Card key={driver.id} className="hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  {/* Avatar + name */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-base flex-shrink-0">
                      {driver.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 leading-tight">{driver.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{driver.phone}</p>
                    </div>
                  </div>
                  {/* Status badge */}
                  <Badge className={cfg.className}>{cfg.label}</Badge>
                </div>

                {/* Vehicle info */}
                <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">
                      🚛 <span className="font-mono font-semibold text-gray-700">{driver.vehicleNumber}</span>
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Since {formatDate(driver.createdAt)}
                    </p>
                  </div>
                  {/* Update status button */}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditingDriver(driver)}
                  >
                    Edit status
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Create Driver Modal */}
      <CreateDriverModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />

      {/* Update Status Modal */}
      {editingDriver && (
        <UpdateDriverStatusModal
          driver={editingDriver}
          isOpen={!!editingDriver}
          onClose={() => setEditingDriver(null)}
        />
      )}
    </div>
  );
}