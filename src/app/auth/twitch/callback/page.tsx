import { Suspense } from 'react';
import { TwitchCallbackContent } from './_content';
import Loading from '@/components/ui/Loading';

import styles from './page.module.scss';

export default function TwitchCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className={styles.page}>
          <div className={styles.card}>
            <Loading
              type="card"
              tone="twitch"
              title="Connecting Twitch…"
              description="Preparing your session, hold on."
            />
          </div>
        </div>
      }
    >
      <TwitchCallbackContent />
    </Suspense>
  );
}
