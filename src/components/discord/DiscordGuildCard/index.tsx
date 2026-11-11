'use client';

import Link from 'next/link';
import { LuArrowRight, LuBell, LuBot, LuPlus, LuUsers } from 'react-icons/lu';
import { DISCORD_BOT_INVITE_URL } from '@/lib/constants/discord-bot-invite';
import { getGuildBannerUrl, getGuildIconUrl } from '@/lib/guild-visuals';
import { canInviteBot, getGuildAccessRole, GUILD_ACCESS_ROLE_LABELS } from '@/lib/guild-access';
import { cn, getInitials } from '@/lib/utils';
import { IDiscordGuildCardProps } from './DiscordGuildCard';

import buttonStyles from '@/components/ui/buttons/Button/styles.module.scss';
import styles from './styles.module.scss';

const compactNumber = new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 });

/**
 * Server tile: logo (+ Discord banner behind it, only when the server has one), name, our role, members.
 * Connected servers link to the server dashboard; the rest show an invite overlay on hover / focus.
 */
const DiscordGuildCard = ({ guild }: IDiscordGuildCardProps) => {
  const iconUrl = getGuildIconUrl(guild.id, guild.icon, 256);
  const bannerUrl = getGuildBannerUrl(guild.id, guild.banner, 512);
  const role = getGuildAccessRole(guild);

  const content = (
    <>
      <div className={styles.head}>
        {bannerUrl && <img className={styles.banner} src={bannerUrl} alt="" loading="lazy" />}

        <div className={styles.avatar}>
          {iconUrl
            ? <img src={iconUrl} alt="" width={64} height={64} loading="lazy" />
            : <span className={styles.initials}>{getInitials(guild.name)}</span>}
          {guild.hasBot && (
            <span className={styles.botPip} title="Xelar bot is on this server">
              <LuBot size={12} aria-hidden />
            </span>
          )}
        </div>

        <div className={styles.info}>
          <span className={styles.name} title={guild.name}>{guild.name}</span>
          <span className={styles.meta}>
            <span className={cn(styles.role, styles[role])}>{GUILD_ACCESS_ROLE_LABELS[role]}</span>
            <span className={styles.metaItem}>
              <LuUsers size={12} aria-hidden />
              {compactNumber.format(guild.memberCount)}
            </span>
          </span>
        </div>

        {guild.hasBot && <LuArrowRight size={16} className={styles.arrow} aria-hidden />}
      </div>

      {guild.hasBot ? (
        <div className={cn(styles.status, styles.connected)}>
          <span className={styles.statusLabel}>
            <span className={styles.liveDot} aria-hidden />
            Xelar connected
          </span>
          <span className={styles.metaItem}>
            <LuBell size={12} aria-hidden />
            {guild.notificationCount} {guild.notificationCount === 1 ? 'notification' : 'notifications'}
          </span>
        </div>
      ) : (
        <div className={cn(styles.status, styles.disconnected)}>
          <span className={styles.statusLabel}>
            <LuBot size={13} aria-hidden />
            Bot not added yet
          </span>
        </div>
      )}
    </>
  );

  if (guild.hasBot) {
    return (
      <Link
        href={`/dashboard/discord/${guild.id}`}
        className={cn(styles.card, styles.cardConnected, bannerUrl && styles.withBanner)}
        aria-label={`Open ${guild.name}`}
      >
        {content}
      </Link>
    );
  }

  const canInvite = canInviteBot(guild) && !!DISCORD_BOT_INVITE_URL;

  return (
    // tabIndex lets keyboard users reach the invite overlay (it opens on focus-within).
    <div className={cn(styles.card, styles.cardIdle, bannerUrl && styles.withBanner)} tabIndex={canInvite ? undefined : 0}>
      {content}

      <div className={styles.overlay}>
        {canInvite ? (
          <>
            <p className={styles.overlayText}>Add the bot to start sending Twitch notifications here.</p>
            <a
              href={DISCORD_BOT_INVITE_URL ?? undefined}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonStyles.button, buttonStyles.neon)}
            >
              <span className={buttonStyles.icon}><LuPlus size={14} /></span>
              <span className={buttonStyles.content}>Invite bot</span>
            </a>
          </>
        ) : (
          <p className={styles.overlayText}>
            Adding a bot needs the <strong>Manage Server</strong> permission. Ask the server owner or an admin to invite Xelar.
          </p>
        )}
      </div>
    </div>
  );
};

export default DiscordGuildCard;
