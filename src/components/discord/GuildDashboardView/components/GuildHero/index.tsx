'use client';

import { LuBell, LuCircleDot, LuRadioTower, LuUsers, LuWallet } from 'react-icons/lu';
import useDiscordGuildInfoQuery from '@/hooks/queries/discord/useDiscordGuildInfoQuery';
import { getGuildIconUrl } from '@/lib/guild-visuals';
import { ADMINISTRATOR, getInitials, hasBitFlagPermission } from '@/lib/utils';
import GuildBanner from '../GuildBanner';
import GuildStat from '../GuildStat';
import { IGuildHeroProps } from './GuildHero';

import styles from './styles.module.scss';

const formatCount = (value: number) => value.toLocaleString('en-US');

/** Suspense component: render inside an `AsyncBoundary`. */
const GuildHero = ({ guildId }: IGuildHeroProps) => {
  const { data: guild } = useDiscordGuildInfoQuery(guildId);
  const iconUrl = getGuildIconUrl(guild.id, guild.icon, 256);
  const role = guild.owner
    ? 'Owner'
    : hasBitFlagPermission(guild.permissions, ADMINISTRATOR) ? 'Admin' : 'Manager';

  return (
    <section className={styles.hero} aria-labelledby="guild-hero-title">
      <GuildBanner guildId={guild.id} banner={guild.banner} className={styles.banner}>
        <dl className={styles.stats}>
          <GuildStat
            icon={LuBell}
            label="Notifications"
            value={formatCount(guild.notificationCount)}
            hint={`${guild.botNotificationCount} bot · ${guild.webhookNotificationCount} webhook`}
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
            hint={`${formatCount(guild.presenceCount)} online`}
          />
          <GuildStat
            icon={LuWallet}
            label="Balance"
            value={Number(guild.balance).toFixed(1)}
            hint="credits"
          />
        </dl>
      </GuildBanner>

      <div className={styles.identity}>
        <div className={styles.avatarRing}>
          <div className={styles.avatar}>
            {iconUrl
              ? <img src={iconUrl} alt="" width={96} height={96} />
              : <span className={styles.initials} aria-hidden>{getInitials(guild.name)}</span>}
          </div>
        </div>

        <div className={styles.identityText}>
          <div className={styles.badges}>
            <span className={styles.badgeLive}>
              <LuCircleDot size={10} aria-hidden />
              Bot active
            </span>
            <span className={styles.badge}>{role}</span>
          </div>
          <h2 id="guild-hero-title" className={styles.name}>{guild.name}</h2>
        </div>
      </div>
    </section>
  );
};

export default GuildHero;
