import { Badge } from '../ui/Badge';
import { BOOKING_STATUS_CONFIG, PRIORITY_CONFIG } from '../../utils/statusConfig';
import type { BookingStatus, PriorityLevel } from '../../types';

export function BookingStatusBadge({ status }: { status: BookingStatus }) {
  const config = BOOKING_STATUS_CONFIG[status];
  return <Badge className={config.className}>{config.label}</Badge>;
}

export function PriorityBadge({ priority }: { priority: PriorityLevel }) {
  const config = PRIORITY_CONFIG[priority];
  return <Badge className={config.className}>{config.label}</Badge>;
}
