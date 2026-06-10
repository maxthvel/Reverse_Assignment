import { cn } from '../../utils/cn';
import type { ReactNode } from 'react';

interface BadgeProps {
  className?: string;
  children: ReactNode;
}

export function Badge({ className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium',
        className
      )}
    >
      {children}
    </span>
  );
}
