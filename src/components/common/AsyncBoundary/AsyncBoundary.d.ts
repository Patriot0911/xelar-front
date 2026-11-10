import { PropsWithChildren, ReactNode } from 'react';

export interface IAsyncBoundaryProps extends PropsWithChildren {
  /** Suspense fallback. Defaults to `<Loading type="block" />`; pass `null` for none. */
  loading?: ReactNode;
  /**
   * Custom fallback for specific errors. Return `undefined` to fall back to `ErrorFallback`.
   * `retry` resets failed queries and re-renders the children.
   */
  renderError?: (error: unknown, retry: () => void) => ReactNode | undefined;
  /** Compact error state for sections. */
  compact?: boolean;
};

export interface IAsyncBoundaryFallbackProps extends Pick<IAsyncBoundaryProps, 'renderError' | 'compact'> {
  onReset: () => void;
};
