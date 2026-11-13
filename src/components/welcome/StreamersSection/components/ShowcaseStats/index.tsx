import StatCard from '@/components/ui/StatCard';
import { formatCompactNumber } from '@/lib/utils';
import { IShowcaseStatsProps } from './ShowcaseStats';

import styles from './styles.module.scss';

const ShowcaseStats = ({ stats, activityWindowDays }: IShowcaseStatsProps) => {
  const items = [
    { id: 'streamers', label: 'Streamers',          value: stats.totalStreamers,               sub: 'with active alerts' },
    { id: 'recent',    label: 'Delivered recently', value: stats.notificationsDeliveredRecent, sub: `last ${activityWindowDays} days` },
    { id: 'total',     label: 'Delivered in total', value: stats.notificationsDelivered,       sub: 'notifications' },
    { id: 'servers',   label: 'Communities',        value: stats.communitiesReached,           sub: 'Discord servers reached' },
  ];

  return (
    <ul className={styles.grid}>
      {items.map(({ id, label, value, sub }) => (
        <li key={id}>
          <StatCard
            className={styles.card}
            label={label}
            value={formatCompactNumber(value)}
            sub={sub}
          />
        </li>
      ))}
    </ul>
  );
}

export default ShowcaseStats;
