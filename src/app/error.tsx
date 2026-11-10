'use client';

import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import ErrorFallback from '@/components/common/ErrorFallback';

import styles from './error.module.scss';

interface IRootErrorProps {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}

/** Errors on pages outside the dashboard (welcome, auth). */
export default function RootError({ error, unstable_retry }: IRootErrorProps) {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <main className={styles.page}>
      <ErrorFallback
        error={error}
        onRetry={() => {
          reset();
          unstable_retry();
        }}
      />
    </main>
  );
}
