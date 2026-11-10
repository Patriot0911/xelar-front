import { ReactNode } from 'react';

export interface IErrorFallbackProps {
  error: unknown;
  onRetry?: () => void;
  actions?: ReactNode;
  compact?: boolean;
  className?: string;
};
