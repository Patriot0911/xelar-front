'use client';

import { Suspense } from 'react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { unstable_catchError, type ErrorInfo } from 'next/error';
import Loading from '@/components/ui/Loading';
import ErrorFallback from '@/components/common/ErrorFallback';
import { IAsyncBoundaryFallbackProps, IAsyncBoundaryProps } from './AsyncBoundary';

/*
 * The only place that touches Next's `unstable_catchError`; if the API changes, change it here.
 * It is used instead of a hand-written class boundary because it lets `redirect()` / `notFound()`
 * pass through and clears itself on client navigation.
 */
const BoundaryFallback = (
  { onReset, renderError, compact }: IAsyncBoundaryFallbackProps,
  { error, unstable_retry }: ErrorInfo,
) => {
  // Reset failed queries first, otherwise the re-render would throw the cached error again.
  const retry = () => {
    onReset();
    unstable_retry();
  };

  return renderError?.(error, retry) ?? <ErrorFallback error={error} onRetry={retry} compact={compact} />;
};

const CatchError = unstable_catchError(BoundaryFallback);

/**
 * Error boundary + Suspense for one independent part of a page. Children may use
 * `useSuspenseQuery` (loading → `loading`, error → fallback) or `useQuery` whose
 * first-load errors are thrown by the default `throwOnError` policy.
 */
const AsyncBoundary = ({ children, loading, renderError, compact }: IAsyncBoundaryProps) => (
  <QueryErrorResetBoundary>
    {({ reset }) => (
      <CatchError onReset={reset} renderError={renderError} compact={compact}>
        <Suspense fallback={loading === undefined ? <Loading type="block" /> : loading}>
          {children}
        </Suspense>
      </CatchError>
    )}
  </QueryErrorResetBoundary>
);

export default AsyncBoundary;
