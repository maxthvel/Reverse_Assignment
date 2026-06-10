import { useDashboardMetrics } from '../hooks/useDashboard';
import { MetricCard } from '../components/dashboard/MetricCard';
import { BookingsByStatusChart } from '../components/dashboard/BookingsByStatusChart';
import { HighPriorityAlert } from '../components/dashboard/HighPriorityAlert';
import { PageHeader } from '../components/layout/PageHeader';
import { formatPercent } from '../utils/formatters';

export function DashboardPage() {
  const { data: metrics, isLoading } = useDashboardMetrics();

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Operations Dashboard"
        subtitle="Live overview of all collection activity"
      />

      {/* High priority alert — shown only when there are high priority bookings */}
      {!isLoading && (metrics?.highPriorityBookings ?? 0) > 0 && (
        <HighPriorityAlert count={metrics!.highPriorityBookings} />
      )}

      {/* KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <MetricCard
          label="Total Bookings"
          value={metrics?.totalBookings}
          icon="📦"
          loading={isLoading}
        />
        <MetricCard
          label="Pending"
          value={metrics?.pendingBookings}
          icon="⏳"
          color="amber"
          loading={isLoading}
        />
        <MetricCard
          label="High Priority"
          value={metrics?.highPriorityBookings}
          icon="🚨"
          color="red"
          loading={isLoading}
        />
        <MetricCard
          label="Completed Today"
          value={metrics?.completedToday}
          icon="✅"
          color="green"
          loading={isLoading}
        />
        <MetricCard
          label="Available Drivers"
          value={metrics?.availableDrivers}
          icon="🚛"
          color="blue"
          loading={isLoading}
        />
        <MetricCard
          label="Assignment Rate"
          value={metrics ? formatPercent(metrics.assignmentRate) : undefined}
          icon="📊"
          color="purple"
          loading={isLoading}
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BookingsByStatusChart />

        {/* Quick stats card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Quick Summary</h3>
          <div className="space-y-3">
            {[
              { label: 'Total bookings in system', value: metrics?.totalBookings ?? '—' },
              { label: 'Awaiting confirmation', value: metrics?.pendingBookings ?? '—' },
              { label: 'Drivers available now', value: metrics?.availableDrivers ?? '—' },
              { label: 'Completed today', value: metrics?.completedToday ?? '—' },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <span className="text-sm text-gray-600">{label}</span>
                <span className="text-sm font-semibold text-gray-900">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
