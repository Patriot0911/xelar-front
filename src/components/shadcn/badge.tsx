import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'destructive' | 'accent';
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
        {
          'bg-[var(--surface-2)] text-[var(--ink-1)] border border-[var(--line)]':
            variant === 'default',
          'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20':
            variant === 'success',
          'bg-amber-500/10 text-amber-400 border border-amber-500/20':
            variant === 'warning',
          'bg-red-500/10 text-red-400 border border-red-500/20':
            variant === 'destructive',
          'bg-[var(--accent-softer)] text-[var(--accent-ink)] border border-[var(--accent-soft)]':
            variant === 'accent',
        },
        className,
      )}
      {...props}
    />
  ),
);
Badge.displayName = 'Badge';

export { Badge };
