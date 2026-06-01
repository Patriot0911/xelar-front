'use client';

import Link from 'next/link';
import { LuBell, LuUsers, LuCircle, LuWallet } from 'react-icons/lu';
import type { IDiscordGuildModel } from '@/lib/models/discord';
import styles from './styles.module.scss';

const DISCORD_CDN = 'https://cdn.discordapp.com';

interface IDiscordGuildCardProps {
  guild: IDiscordGuildModel;
}

const DiscordGuildCard = ({ guild }: IDiscordGuildCardProps) => {
  const iconUrl = guild.icon
    ? `${DISCORD_CDN}/icons/${guild.id}/${guild.icon}.${guild.icon.startsWith('a_') ? 'gif' : 'png'}?size=128`
    : null;

  const initials = guild.name
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <Link href={`/dashboard/discord/${guild.id}`} className={styles.card}>
      <div className={styles.top}>
        <div className={styles.icon}>
          {iconUrl
            ? <img src={iconUrl} alt={guild.name} width={52} height={52} />
            : <span className={styles.initials}>{initials}</span>
          }
        </div>
        <div className={styles.nameMeta}>
          <span className={styles.name}>{guild.name}</span>
          {guild.owner && <span className={styles.ownerBadge}>Owner</span>}
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <LuUsers size={13} className={styles.statIcon} />
          <span className={styles.statValue}>{guild.memberCount.toLocaleString()}</span>
          <span className={styles.statLabel}>Members</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.stat}>
          <LuCircle size={10} className={`${styles.statIcon} ${styles.statIconOnline}`} />
          <span className={styles.statValue}>{guild.presenceCount.toLocaleString()}</span>
          <span className={styles.statLabel}>Online</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.stat}>
          <LuBell size={13} className={styles.statIcon} />
          <span className={styles.statValue}>{guild.notificationCount}</span>
          <span className={styles.statLabel}>Alerts</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.stat}>
          <LuWallet size={13} className={styles.statIcon} />
          <span className={styles.statValue}>{guild.balance}</span>
          <span className={styles.statLabel}>Balance</span>
        </div>
      </div>

      <div className={styles.footer}>
        <span className={styles.footerLink}>View notifications →</span>
      </div>
    </Link>
  );
};

export default DiscordGuildCard;
