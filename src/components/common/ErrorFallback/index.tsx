'use client';

import { useEffect } from 'react';
import ErrorState from '@/components/ui/ErrorState';
import { ErrorStateVariant } from '@/components/ui/ErrorState/ErrorState';
import { toApiError } from '@/lib/errors';
import { API_ERROR_TITLES, ApiErrorKind } from '@/lib/constants/errors';
import { IErrorFallbackProps } from './ErrorFallback';

const VARIANTS: Partial<Record<ApiErrorKind, ErrorStateVariant>> = {
  [ApiErrorKind.Network]: 'offline',
  [ApiErrorKind.NotFound]: 'not-found',
  [ApiErrorKind.Forbidden]: 'forbidden',
};

// Retrying can't fix these: the answer will be the same.
const NON_RETRYABLE = new Set<ApiErrorKind>([
  ApiErrorKind.NotFound,
  ApiErrorKind.Forbidden,
  ApiErrorKind.Validation,
  ApiErrorKind.Business,
]);

const IS_DEV = process.env.NODE_ENV !== 'production';

/** Renders any caught error (API or render-time) as a user-friendly `ErrorState`. */
const ErrorFallback = ({ error, onRetry, actions, compact, className }: IErrorFallbackProps) => {
  const apiError = toApiError(error);

  useEffect(() => {
    console.error('[ErrorFallback]', error);
  }, [error]);

  const devDetails = IS_DEV
    ? [error instanceof Error ? `${error.name}: ${error.message}` : String(error), JSON.stringify(apiError.details, null, 2)]
      .filter((line) => line && line !== 'undefined')
      .join('\n\n')
    : undefined;

  return (
    <ErrorState
      title={API_ERROR_TITLES[apiError.kind]}
      description={apiError.message}
      variant={VARIANTS[apiError.kind] ?? 'error'}
      onRetry={NON_RETRYABLE.has(apiError.kind) ? undefined : onRetry}
      actions={actions}
      details={devDetails}
      compact={compact}
      className={className}
    />
  );
};

export default ErrorFallback;
