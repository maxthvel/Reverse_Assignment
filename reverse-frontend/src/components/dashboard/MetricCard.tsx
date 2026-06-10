import { cn } from '../../utils/cn';

type Color = 'default' | 'amber' | 'red' | 'green' | 'blue' | 'purple';

const COLOR_MAP: Record<Color, string> = {
  default: 'bg-white border-gray-200',
  amber: 'bg-amber-50 border-amber-200',
  red: 'bg-red-50 border-red-200',
  green: 'bg-green-50 border-green-200',
  blue: 'bg-blue-50 border-blue-200',
  purple: 'bg-purple-50 border-purple-200',
};

const VALUE_COLOR: Record<Color, string> = {
  default: 'text-gray-900',
  amber: 'text-amber-700',
  red: 'text-red-700',
  green: 'text-green-700',
  blue: 'text-blue-700',
  purple: 'text-purple-700',
};

interface MetricCardProps {
  label: string;
  value?: number | string;
  icon: string;
  color?: Color;
  loading?: boolean;
}

export function MetricCard({ label, value, icon, color = 'default', loading = false }: MetricCardProps) {
  return (
    <div className={cn('rounded-xl border p-4 shadow-sm', COLOR_MAP[color])}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-2xl">{icon}</span>
      </div>
      {loading ? (
        <div className="h-7 w-16 bg-gray-200 rounded animate-pulse mb-1" />
      ) : (
        <p className={cn('text-2xl font-bold', VALUE_COLOR[color])}>
          {value ?? '—'}
        </p>
      )}
      <p className="text-xs text-gray-500 mt-1 font-medium">{label}</p>
    </div>
  );
}
