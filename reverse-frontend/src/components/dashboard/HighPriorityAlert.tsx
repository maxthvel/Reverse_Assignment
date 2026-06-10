import { useNavigate } from 'react-router-dom';

interface HighPriorityAlertProps {
  count: number;
}

export function HighPriorityAlert({ count }: HighPriorityAlertProps) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between bg-red-50 border border-red-200 rounded-xl px-5 py-3.5">
      <div className="flex items-center gap-3">
        <span className="text-xl">🚨</span>
        <div>
          <p className="text-sm font-semibold text-red-700">
            {count} High Priority {count === 1 ? 'Booking' : 'Bookings'} Need Attention
          </p>
          <p className="text-xs text-red-500 mt-0.5">
            Bookings with over 100 packages are escalated automatically.
          </p>
        </div>
      </div>
      <button
        onClick={() => navigate('/bookings?priority=HIGH')}
        className="text-xs font-semibold text-red-700 underline hover:text-red-900 transition-colors whitespace-nowrap"
      >
        View all →
      </button>
    </div>
  );
}
