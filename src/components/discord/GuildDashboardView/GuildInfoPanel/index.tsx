'use client';

import { LuUsers, LuCircleDot, LuBell, LuCoins } from 'react-icons/lu';
import useDiscordGuildInfoQuery from '@/hooks/queries/discord/useDiscordGuildInfoQuery';
import { IGuildInfoPanelProps } from './GuildInfoPanel';
import GuildSettings from './GuildSettings';

import styles from '../styles.module.scss';

const GuildInfoPanel = ({ guildId }: IGuildInfoPanelProps) => {
  const { data: guild,  isLoading: infoLoading } = useDiscordGuildInfoQuery(guildId);

  const iconUrl = guild?.icon
    ? `https://cdn.discordapp.com/icons/${guildId}/${guild.icon}${guild.icon.startsWith('a_') ? '.gif' : '.png'}?size=128`
    : null;

  return (
    <div className={styles.infoCard}>
      {/* Guild identity */}
      <div className={styles.identity}>
        {iconUrl ? (
          <img src={iconUrl} alt={guild?.name ?? ''} className={styles.guildIcon} />
        ) : (
          <div className={styles.guildIconFallback}>
            {guild?.name?.[0]?.toUpperCase() ?? '?'}
          </div>
        )}
        <h2 className={styles.guildName}>{guild?.name ?? '—'}</h2>
      </div>

      {/* Stats */}
      <div className={styles.stats}>
        <div className={styles.stat}>
          <LuUsers size={12} className={styles.statIcon} />
          <span className={styles.statLabel}>Members</span>
          <span className={styles.statValue}>{guild?.memberCount ?? '—'}</span>
        </div>
        <div className={styles.stat}>
          <LuCircleDot size={12} className={styles.statIcon} />
          <span className={styles.statLabel}>Online</span>
          <span className={styles.statValue}>{guild?.presenceCount ?? '—'}</span>
        </div>
        <div className={styles.stat}>
          <LuBell size={12} className={styles.statIcon} />
          <span className={styles.statLabel}>Notifications</span>
          <span className={styles.statValue}>{guild?.notificationCount ?? '—'}</span>
        </div>
        <div className={styles.stat}>
          <LuCoins size={12} className={styles.statIcon} />
          <span className={styles.statLabel}>Balance</span>
          <span className={styles.statValue}>{guild?.balance ?? '—'}</span>
        </div>
      </div>

      <div className={styles.separator} />

      {/* Settings */}
      <GuildSettings
        guildId={guildId}
      />
    </div>
  );
};

export default GuildInfoPanel;
