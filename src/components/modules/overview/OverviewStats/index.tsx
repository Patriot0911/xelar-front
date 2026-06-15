'use client';

import StatCard from '@/components/ui/StatCard';
import usePlatformStatsQuery from '@/hooks/queries/statistics/usePlatformStatsQuery';

import styles from './styles.module.scss';

const OverviewStats = () => {
  const { data, isLoading } = usePlatformStatsQuery();

  const value = (n: number | undefined) => (isLoading ? '—' : (n ?? 0).toLocaleString());

  const stats = [
    { label: 'Total notifications', value: value(data?.totalNotifications), sub: 'All time' },
    { label: 'Successful notifications', value: value(data?.successfulNotifications), sub: 'All time' },
    { label: 'Streamers', value: value(data?.totalStreamers), sub: 'Tracked on Twitch' },
    { label: 'Discord guilds', value: value(data?.totalGuilds), sub: 'Connected servers' },
  ];

  return (
    <div className={styles.statsGrid}>
      {stats.map((s) => (
        <StatCard key={s.label} {...s} />
      ))}
    </div>
  );
}

export default OverviewStats;
