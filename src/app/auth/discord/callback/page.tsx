import { Suspense } from 'react';
import { DiscordCallbackContent } from './_content';
import Loading from '@/components/ui/Loading';

import styles from './page.module.scss';

export default function DiscordCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className={styles.page}>
          <div className={styles.card}>
            <Loading
              type="card"
              tone="discord"
              title="Connecting Discord…"
              description="Preparing your session, hold on."
            />
          </div>
        </div>
      }
    >
      <DiscordCallbackContent />
    </Suspense>
  );
}
