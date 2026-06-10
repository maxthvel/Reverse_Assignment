import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { useBookingsByStatus } from '../../hooks/useDashboard';
import { Card } from '../ui/Card';
import { Spinner } from '../ui/Spinner';
import type { BookingStatus } from '../../types';

const STATUS_COLORS: Record<BookingStatus, string> = {
  PENDING: '#F59E0B',
  CONFIRMED: '#3B82F6',
  ASSIGNED: '#8B5CF6',
  IN_PROGRESS: '#F97316',
  COMPLETED: '#10B981',
  CANCELLED: '#EF4444',
};

export function BookingsByStatusChart() {
  const { data, isLoading } = useBookingsByStatus();

  return (
    <Card>
      <h3 className="text-sm font-semibold text-gray-700 mb-4">Bookings by Status</h3>
      {isLoading ? (
        <div className="flex justify-center py-10"><Spinner /></div>
      ) : !data?.length ? (
        <p className="text-sm text-gray-400 py-8 text-center">No data available</p>
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 4 }}>
            <XAxis
              dataKey="status"
              tick={{ fontSize: 10, fill: '#6B7280' }}
              tickFormatter={(v) => v.replace('_', ' ')}
            />
            <YAxis tick={{ fontSize: 10, fill: '#6B7280' }} />
            <Tooltip
              formatter={(value) => [value, 'Bookings']}
              labelFormatter={(label) => label.replace('_', ' ')}
              contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #E5E7EB' }}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {data.map((entry) => (
                <Cell
                  key={entry.status}
                  fill={STATUS_COLORS[entry.status as BookingStatus] ?? '#9CA3AF'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
}
