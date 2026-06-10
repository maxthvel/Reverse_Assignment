import type { ActivityLog } from '../../types';
import { ACTIVITY_ACTION_CONFIG } from '../../utils/statusConfig';
import { formatDate, formatRelativeTime } from '../../utils/formatters';

interface TimelineEventProps {
  log: ActivityLog;
  isLast: boolean;
}

function TimelineEvent({ log, isLast }: TimelineEventProps) {
  const config = ACTIVITY_ACTION_CONFIG[log.action];

  return (
    <div className="relative flex gap-4">
      {/* Connector line */}
      {!isLast && (
        <div className="absolute left-[18px] top-8 bottom-0 w-px bg-gray-200" />
      )}

      {/* Icon bubble */}
      <div className="flex-shrink-0 w-9 h-9 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center text-sm z-10">
        {config.icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 pb-5">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-3">
          <div className="flex items-start justify-between gap-2">
            <p className={`text-sm font-semibold ${config.color}`}>
              {config.label}
            </p>
            <time
              className="text-xs text-gray-400 whitespace-nowrap flex-shrink-0"
              title={formatDate(log.createdAt)}
            >
              {formatRelativeTime(log.createdAt)}
            </time>
          </div>

          {/* State transition display */}
          {(log.fromValue || log.toValue) && (
            <div className="mt-1.5 flex items-center gap-1.5 text-xs text-gray-500">
              {log.fromValue && (
                <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-500 line-through">
                  {log.fromValue}
                </span>
              )}
              {log.fromValue && log.toValue && (
                <span className="text-gray-400">→</span>
              )}
              {log.toValue && (
                <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-medium">
                  {log.toValue}
                </span>
              )}
            </div>
          )}

          {log.performedBy && (
            <p className="mt-1 text-xs text-gray-400">by {log.performedBy}</p>
          )}
        </div>
      </div>
    </div>
  );
}

interface ActivityTimelineProps {
  logs: ActivityLog[];
}

export function ActivityTimeline({ logs }: ActivityTimelineProps) {
  if (!logs.length) {
    return (
      <p className="text-sm text-gray-400 italic text-center py-8">
        No activity recorded yet.
      </p>
    );
  }

  return (
    <div className="relative">
      {logs.map((log, index) => (
        <TimelineEvent
          key={log.id}
          log={log}
          isLast={index === logs.length - 1}
        />
      ))}
    </div>
  );
}
