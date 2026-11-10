import { LuBell, LuRadioTower, LuUsers, LuWallet } from 'react-icons/lu';
import AsyncBoundary from '@/components/common/AsyncBoundary';
import GuildStat from '../GuildStat';
import { IGuildHeroStatsProps } from './GuildHeroStats';

import styles from './styles.module.scss';

const EMPTY = '—';

const formatCount = (value: number | null) => (value === null ? EMPTY : value.toLocaleString('en-US'));

const StatsStrip = ({ guild }: IGuildHeroStatsProps) => {
  const hasSplit = guild.botNotificationCount !== null && guild.webhookNotificationCount !== null;

  return (
    <dl className={styles.stats}>
      <GuildStat
        icon={LuBell}
        label="Notifications"
        value={formatCount(guild.notificationCount)}
        hint={hasSplit ? `${guild.botNotificationCount} bot · ${guild.webhookNotificationCount} webhook` : undefined}
      />
      <GuildStat
        icon={LuRadioTower}
        label="Subscriptions"
        value={formatCount(guild.subscriptionCount)}
        hint="Twitch events"
      />
      <GuildStat
        icon={LuUsers}
        label="Members"
        value={formatCount(guild.memberCount)}
        hint={guild.presenceCount !== null ? `${formatCount(guild.presenceCount)} online` : undefined}
      />
      <GuildStat
        icon={LuWallet}
        label="Balance"
        value={guild.balance === null ? EMPTY : guild.balance.toFixed(1)}
        hint="credits"
      />
    </dl>
  );
};

/** Isolated by its own boundary: a broken stat must not take the banner, icon and name down with it. */
const GuildHeroStats = ({ guild }: IGuildHeroStatsProps) => (
  <AsyncBoundary
    loading={null}
    renderError={() => <p className={styles.unavailable} role="status">Stats unavailable</p>}
  >
    <StatsStrip guild={guild} />
  </AsyncBoundary>
);

export default GuildHeroStats;
