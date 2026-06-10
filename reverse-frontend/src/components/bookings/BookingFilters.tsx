import { type ChangeEvent } from 'react';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import type { BookingFilters as FiltersType } from '../../types';

interface BookingFiltersProps {
  filters: FiltersType;
  onChange: (filters: FiltersType) => void;
}

const STATUS_OPTIONS = [
  { value: '', label: 'All Statuses' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'CONFIRMED', label: 'Confirmed' },
  { value: 'ASSIGNED', label: 'Assigned' },
  { value: 'IN_PROGRESS', label: 'In Progress' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'CANCELLED', label: 'Cancelled' },
];

const PRIORITY_OPTIONS = [
  { value: '', label: 'All Priorities' },
  { value: 'NORMAL', label: 'Normal' },
  { value: 'HIGH', label: 'High Priority' },
];

const SORT_OPTIONS = [
  { value: 'createdAt', label: 'Date Created' },
  { value: 'scheduledAt', label: 'Scheduled At' },
  { value: 'packageCount', label: 'Package Count' },
];

export function BookingFilters({ filters, onChange }: BookingFiltersProps) {
  const set = (patch: Partial<FiltersType>) =>
    onChange({ ...filters, ...patch, page: 1 }); // reset to page 1 on filter change

  const hasActiveFilters = filters.status || filters.priority || filters.search;

  return (
    <div className="flex flex-wrap items-end gap-3">
      {/* Search */}
      <div className="flex-1 min-w-[200px]">
        <Input
          label="Search"
          placeholder="Search by address…"
          value={filters.search ?? ''}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            set({ search: e.target.value || undefined })
          }
        />
      </div>

      {/* Status */}
      <div className="w-44">
        <Select
          label="Status"
          value={filters.status ?? ''}
          onChange={(e) => set({ status: e.target.value as FiltersType['status'] })}
          options={STATUS_OPTIONS}
        />
      </div>

      {/* Priority */}
      <div className="w-40">
        <Select
          label="Priority"
          value={filters.priority ?? ''}
          onChange={(e) => set({ priority: e.target.value as FiltersType['priority'] })}
          options={PRIORITY_OPTIONS}
        />
      </div>

      {/* Sort */}
      <div className="w-44">
        <Select
          label="Sort By"
          value={filters.sortBy ?? 'createdAt'}
          onChange={(e) => set({ sortBy: e.target.value })}
          options={SORT_OPTIONS}
        />
      </div>

      {/* Order toggle */}
      <button
        onClick={() => set({ order: filters.order === 'asc' ? 'desc' : 'asc' })}
        className="h-[38px] px-3 rounded-lg border border-gray-300 text-sm text-gray-600 hover:bg-gray-50 transition-colors bg-white"
        title="Toggle sort order"
      >
        {filters.order === 'asc' ? '↑ Asc' : '↓ Desc'}
      </button>

      {/* Clear */}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onChange({ page: 1, limit: 10, sortBy: 'createdAt', order: 'desc' })}
        >
          Clear filters
        </Button>
      )}
    </div>
  );
}
