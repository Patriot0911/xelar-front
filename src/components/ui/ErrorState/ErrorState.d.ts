import { ReactNode } from 'react';

export type ErrorStateVariant = 'error' | 'offline' | 'not-found' | 'forbidden';

export interface IErrorStateProps {
  title: string;
  description?: string;
  variant?: ErrorStateVariant;
  /** Shows a "Try again" button. */
  onRetry?: () => void;
  retryLabel?: string;
  /** Extra actions next to the retry button (e.g. a link back). */
  actions?: ReactNode;
  /** Technical details, rendered collapsed (development only by convention). */
  details?: string;
  /** Smaller min-height for errors inside a section rather than a whole page. */
  compact?: boolean;
  className?: string;
};
