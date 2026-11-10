'use client';

import ErrorState from '@/components/ui/ErrorState';
import { API_ERROR_MESSAGES, API_ERROR_TITLES, ApiErrorKind } from '@/lib/constants/errors';

import '@/styles/global.scss';
import styles from './error.module.scss';

interface IGlobalErrorProps {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}

/** Last resort: the root layout itself failed, so this renders its own <html>/<body>. */
export default function GlobalError({ unstable_retry }: IGlobalErrorProps) {
  return (
    <html lang="en">
      <body>
        <main className={styles.page}>
          <ErrorState
            title={API_ERROR_TITLES[ApiErrorKind.Unknown]}
            description={API_ERROR_MESSAGES[ApiErrorKind.Unknown]}
            onRetry={() => unstable_retry()}
            retryLabel="Reload"
          />
        </main>
      </body>
    </html>
  );
}
