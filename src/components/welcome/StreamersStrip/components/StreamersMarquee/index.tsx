import { CSSProperties } from 'react';
import { STREAMERS_MARQUEE_MIN_ITEMS, STREAMERS_MARQUEE_SECONDS_PER_ITEM } from '@/lib/constants/welcome';
import StreamerCard from '../StreamerCard';
import { IStreamersMarqueeProps } from './StreamersMarquee';

import styles from './styles.module.scss';

/**
 * Pure-CSS infinite horizontal scroll (no client JS): the list is rendered twice and the track
 * slides by exactly one copy. Pauses on hover / keyboard focus; with `prefers-reduced-motion`
 * (or too few streamers to loop nicely) it becomes a regular, swipeable horizontal row.
 */
const StreamersMarquee = ({ streamers, activityWindowDays }: IStreamersMarqueeProps) => {
  const isAnimated = streamers.length >= STREAMERS_MARQUEE_MIN_ITEMS;
  const style = { '--marquee-duration': `${streamers.length * STREAMERS_MARQUEE_SECONDS_PER_ITEM}s` } as CSSProperties;

  const renderList = (isClone: boolean) => (
    <ul className={styles.list} aria-hidden={isClone || undefined} data-clone={isClone}>
      {streamers.map((streamer) => (
        <li key={streamer.twitchLogin} className={styles.item}>
          <StreamerCard streamer={streamer} activityWindowDays={activityWindowDays} isClone={isClone} />
        </li>
      ))}
    </ul>
  );

  return (
    <div className={styles.viewport} data-animated={isAnimated}>
      <div className={styles.track} style={style}>
        {renderList(false)}
        {isAnimated && renderList(true)}
      </div>
    </div>
  );
}

export default StreamersMarquee;
