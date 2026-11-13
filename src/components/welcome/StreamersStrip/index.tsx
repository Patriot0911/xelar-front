import PublicService from '@/lib/services/public.service';
import { formatCompactNumber } from '@/lib/utils';
import StreamersMarquee from './components/StreamersMarquee';

import styles from './styles.module.scss';

/**
 * Strip of streamers right under the hero. Async server component: the showcase is fetched on the
 * server and cached by Next (ISR), so it is part of the HTML. Renders nothing when the API is
 * unavailable or nobody is listed yet.
 */
const StreamersStrip = async () => {
  const showcase = await PublicService.getStreamersShowcase();
  if (!showcase || showcase.streamers.length === 0) return null;

  const { streamers, stats, activityWindowDays } = showcase;

  return (
    <section aria-label="Streamers on Xelar" className={styles.strip}>
      <p className={styles.caption}>
        <span className={styles.dot} aria-hidden="true" />
        <span><strong>{formatCompactNumber(stats.totalStreamers)}</strong> streamers</span>
        <span className={styles.sep} aria-hidden="true">·</span>
        <span><strong>{formatCompactNumber(stats.notificationsDeliveredRecent)}</strong> alerts in {activityWindowDays} days</span>
        <span className={styles.sep} aria-hidden="true">·</span>
        <span><strong>{formatCompactNumber(stats.communitiesReached)}</strong> Discord servers</span>
      </p>
      <StreamersMarquee streamers={streamers} activityWindowDays={activityWindowDays} />
    </section>
  );
}

export default StreamersStrip;
