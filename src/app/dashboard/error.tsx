'use client';

import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import PageContent from '@/components/ui/PageContent';
import ErrorFallback from '@/components/common/ErrorFallback';

interface IDashboardErrorProps {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}

/**
 * Catches anything a dashboard page throws: a failed first load (default `throwOnError` policy),
 * a contract mismatch or a render bug. The dashboard layout (sidebar, header) stays on screen.
 */
export default function DashboardError({ error, unstable_retry }: IDashboardErrorProps) {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <PageContent>
      <ErrorFallback
        error={error}
        onRetry={() => {
          reset();
          unstable_retry();
        }}
      />
    </PageContent>
  );
}
