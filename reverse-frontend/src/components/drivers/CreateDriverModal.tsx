import { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useCreateDriver } from '../../hooks/useDrivers';

interface CreateDriverModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateDriverModal({ isOpen, onClose }: CreateDriverModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');

  const { mutate: createDriver, isPending, error } = useCreateDriver();

  const handleCreate = () => {
    if (!name.trim() || !phone.trim() || !vehicleNumber.trim()) return;
    createDriver(
      { name: name.trim(), phone: phone.trim(), vehicleNumber: vehicleNumber.trim() },
      {
        onSuccess: () => {
          setName('');
          setPhone('');
          setVehicleNumber('');
          onClose();
        },
      }
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Register Driver">
      <div className="space-y-4">
        <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <Input label="Vehicle Number" value={vehicleNumber} onChange={(e) => setVehicleNumber(e.target.value)} />

        {error && (
          <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3">
            <p className="text-sm text-red-700 font-medium">Failed to create driver</p>
            <p className="text-xs text-red-600 mt-0.5">{error.message}</p>
          </div>
        )}

        <div className="flex justify-end gap-3 pt-1">
          <Button variant="outline" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button onClick={handleCreate} loading={isPending} disabled={isPending}>
            Create Driver
          </Button>
        </div>
      </div>
    </Modal>
  );
}
