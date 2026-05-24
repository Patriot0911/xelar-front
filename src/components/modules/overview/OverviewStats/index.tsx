import StatCard from '@/components/ui/StatCard';

import styles from './styles.module.scss';

const STATS = [
  { label: 'Active bridges', value: '0', sub: 'No bridges yet' },
  { label: 'Events sent', value: '0', sub: 'All time' },
  { label: 'Channels wired', value: '0', sub: 'Discord channels' },
  { label: 'Uptime', value: '—', sub: 'No active bridges' },
];

const OverviewStats = () => {
  return (
    <div className={styles.statsGrid}>
      {STATS.map((s) => (
        <StatCard key={s.label} {...s} />
      ))}
    </div>
  );
}

export default OverviewStats;
