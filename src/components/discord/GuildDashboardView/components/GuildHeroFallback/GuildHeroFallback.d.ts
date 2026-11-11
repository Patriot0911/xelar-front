import { ReactNode } from 'react';

export interface IGuildHeroFallbackProps {
  guildId: string;
  error?: unknown;
  onRetry?: () => void;
  /** Custom state inside the glass card instead of the generic `ErrorFallback` for `error`. */
  children?: ReactNode;
};
