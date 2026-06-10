import { useState } from 'react';
import { useAvailableDrivers, useAssignDriver } from '../../hooks/useDrivers';
import { Modal } from '../ui/Modal';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { Spinner } from '../ui/Spinner';

interface AssignDriverModalProps {
  bookingId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function AssignDriverModal({ bookingId, isOpen, onClose }: AssignDriverModalProps) {
  const [selectedDriverId, setSelectedDriverId] = useState('');
  const [notes, setNotes] = useState('');

  const { data: drivers, isLoading: loadingDrivers } = useAvailableDrivers();
  const { mutate: assign, isPending, error } = useAssignDriver();

  const handleAssign = () => {
    if (!selectedDriverId) return;
    assign(
      { bookingId, driverId: selectedDriverId, notes: notes || undefined },
      {
        onSuccess: () => {
          setSelectedDriverId('');
          setNotes('');
          onClose();
        },
      }
    );
  };

  const driverOptions = [
    { value: '', label: 'Select a driver…' },
    ...(drivers ?? []).map((d) => ({
      value: d.id,
      label: `${d.name} · ${d.vehicleNumber}`,
    })),
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Assign Driver">
      <div className="space-y-4">
        {loadingDrivers ? (
          <div className="flex items-center gap-2 py-2">
            <Spinner size="sm" />
            <span className="text-sm text-gray-500">Loading available drivers…</span>
          </div>
        ) : drivers?.length === 0 ? (
          <div className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-3">
            <p className="text-sm text-amber-700 font-medium">No drivers available</p>
            <p className="text-xs text-amber-600 mt-0.5">
              All drivers are currently busy or offline.
            </p>
          </div>
        ) : (
          <Select
            label="Available Driver"
            value={selectedDriverId}
            onChange={(e) => setSelectedDriverId(e.target.value)}
            options={driverOptions}
          />
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notes <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            placeholder="Instructions for the driver…"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        {error && (
          <p className="text-xs text-red-600 font-medium">{error.message}</p>
        )}

        <div className="flex justify-end gap-3 pt-1">
          <Button variant="outline" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button
            onClick={handleAssign}
            disabled={!selectedDriverId || loadingDrivers}
            loading={isPending}
          >
            Assign Driver
          </Button>
        </div>
      </div>
    </Modal>
  );
}
