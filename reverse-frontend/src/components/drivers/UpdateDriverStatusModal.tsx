import { useEffect, useState } from 'react';
import { Modal } from '../ui/Modal';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { Spinner } from '../ui/Spinner';
import { useUpdateDriverStatus } from '../../hooks/useDrivers';
import { DRIVER_STATUS_CONFIG } from '../../utils/statusConfig';
import type { Driver, DriverStatus } from '../../types';

interface UpdateDriverStatusModalProps {
  driver: Driver;
  isOpen: boolean;
  onClose: () => void;
}

export function UpdateDriverStatusModal({ driver, isOpen, onClose }: UpdateDriverStatusModalProps) {
  const [status, setStatus] = useState<DriverStatus>(driver.status);
  const { mutate: updateStatus, isPending, error } = useUpdateDriverStatus();

  useEffect(() => {
    setStatus(driver.status);
  }, [driver]);

  const handleSave = () => {
    if (!status) return;
    updateStatus({ id: driver.id, status }, { onSuccess: () => onClose() });
  };

  const options = (Object.keys(DRIVER_STATUS_CONFIG) as DriverStatus[]).map((s) => ({
    value: s,
    label: DRIVER_STATUS_CONFIG[s].label,
  }));

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Update Driver Status">
      <div className="space-y-4">
        <Select label="Status" value={status} onChange={(e) => setStatus(e.target.value as DriverStatus)} options={options} />

        {isPending && (
          <div className="flex items-center gap-2 py-2">
            <Spinner size="sm" />
            <span className="text-sm text-gray-500">Updating status…</span>
          </div>
        )}

        {error && <p className="text-xs text-red-600 font-medium">{error.message}</p>}

        <div className="flex justify-end gap-3 pt-1">
          <Button variant="outline" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button onClick={handleSave} loading={isPending} disabled={status === driver.status || isPending}>
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
}
