'use client';

import Link from 'next/link';
import { LuBell, LuUsers, LuCircle, LuWallet, LuArrowRight, LuBotOff, LuPlus } from 'react-icons/lu';
import type { IDiscordGuildModel } from '@/lib/models/discord';
import { DISCORD_BOT_INVITE_URL } from '@/lib/constants/discord-bot-invite';
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

  const header = (
    <div className={styles.top}>
      <div className={styles.icon}>
        {iconUrl
          ? <img src={iconUrl} alt={guild.name} width={52} height={52} />
          : <span className={styles.initials}>{initials}</span>
        }
      </div>
      <div className={styles.nameMeta}>
        <span className={styles.name}>{guild.name}</span>
        <div className={styles.badges}>
          <span className={`${styles.badge} ${guild.owner ? styles.badgeOwner : styles.badgeMember}`}>
            {guild.owner ? 'Owner' : 'Member'}
          </span>
          <span className={`${styles.badge} ${guild.hasBot ? styles.badgeActive : styles.badgeInactive}`}>
            <LuCircle size={6} className={styles.badgeDot} />
            {guild.hasBot ? 'Bot Active' : 'No Bot'}
          </span>
        </div>
      </div>
      {guild.hasBot && <LuArrowRight size={16} className={styles.arrow} />}
    </div>
  );

  if (!guild.hasBot) {
    return (
      <div className={styles.card}>
        {header}
        <div className={styles.divider} />
        <div className={styles.placeholder}>
          <div className={styles.placeholderIcon}>
            <LuBotOff size={20} />
          </div>
          <span className={styles.placeholderTitle}>Xelar isn&apos;t in this server yet</span>
          <span className={styles.placeholderMeta}>
            {guild.memberCount.toLocaleString()} members · no notifications
          </span>
        </div>

        <div className={styles.overlay}>
          <p className={styles.overlayText}>Add the bot to start sending Twitch notifications here.</p>
          {DISCORD_BOT_INVITE_URL && (
            <a
              href={DISCORD_BOT_INVITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.overlayBtn}
            >
              <LuPlus size={14} />
              Invite bot
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <Link href={`/dashboard/discord/${guild.id}`} className={`${styles.card} ${styles.cardActive}`}>
      {header}
      <div className={styles.divider} />
      <div className={styles.stats}>
        <div className={styles.stat}>
          <LuBell size={13} className={styles.statIcon} />
          <span className={styles.statValue}>{guild.notificationCount}</span>
          <span className={styles.statLabel}>Notifications</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.stat}>
          <LuCircle size={10} className={`${styles.statIcon} ${styles.statIconOnline}`} />
          <span className={styles.statValue}>{guild.presenceCount.toLocaleString()}</span>
          <span className={styles.statLabel}>Online</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.stat}>
          <LuUsers size={13} className={styles.statIcon} />
          <span className={styles.statValue}>{guild.memberCount.toLocaleString()}</span>
          <span className={styles.statLabel}>Members</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.stat}>
          <LuWallet size={13} className={styles.statIcon} />
          <span className={styles.statValue}>{guild.balance}</span>
          <span className={styles.statLabel}>Balance</span>
        </div>
      </div>
    </Link>
  );
};

export default DiscordGuildCard;
