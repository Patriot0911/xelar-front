import { Suspense } from 'react';
import { TwitchCallbackContent } from './_content';

import styles from './page.module.scss';

export default function TwitchCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className={styles.page}>
          <div className={styles.card}>
            <div className={styles.loading}>
              <div className={styles.spinner} />
              <div>
                <p className={styles.title}>Connecting Twitch…</p>
                <p className={styles.sub}>Loading…</p>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <TwitchCallbackContent />
    </Suspense>
  );
}
