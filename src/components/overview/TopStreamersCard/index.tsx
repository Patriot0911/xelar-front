'use client';

import Image from 'next/image';
import useTopStreamersQuery from '@/hooks/queries/statistics/useTopStreamersQuery';
import { ITopStreamerItem } from '@/lib/models/statistics/statistics.model';

import styles from './styles.module.scss';

function StreamerRow({ streamer, rank, max }: { streamer: ITopStreamerItem; rank: number; max: number }) {
  const displayName = streamer.displayName ?? streamer.twitchLogin;
  const pct = max > 0 ? (streamer.notificationCount / max) * 100 : 0;

  return (
    <div className={styles.row}>
      <span className={styles.rank}>#{rank}</span>

      {streamer.profileImageUrl ? (
        <Image
          className={styles.avatar}
          src={streamer.profileImageUrl}
          alt={displayName}
          width={34}
          height={34}
          unoptimized
        />
      ) : (
        <div className={styles.avatarFallback}>
          {streamer.twitchLogin.slice(0, 2)}
        </div>
      )}

      <div className={styles.info}>
        <div className={styles.name}>{displayName}</div>
        {streamer.displayName && (
          <div className={styles.login}>{streamer.twitchLogin}</div>
        )}
      </div>

      <div className={styles.barWrap}>
        <div className={styles.bar}>
          <div className={styles.barFill} style={{ width: `${pct}%` }} />
        </div>
        <span className={styles.count}>{streamer.notificationCount}</span>
      </div>
    </div>
  );
}

const TopStreamersCard = () => {
  const { data, isLoading } = useTopStreamersQuery();
  const max = data?.[0]?.notificationCount ?? 0;

  return (
    <div className={styles.card}>
      <div className={styles.title}>Top Streamers</div>

      {isLoading && <div className={styles.placeholder}>Loading…</div>}
      {!isLoading && !data?.length && (
        <div className={styles.placeholder}>No data yet</div>
      )}

      {!!data?.length && (
        <div className={styles.list}>
          {data.map((streamer, i) => (
            <StreamerRow key={streamer.twitchLogin} streamer={streamer} rank={i + 1} max={max} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TopStreamersCard;
