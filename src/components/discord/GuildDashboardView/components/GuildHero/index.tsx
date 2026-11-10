'use client';

import { LuCircleDot } from 'react-icons/lu';
import useDiscordGuildInfoQuery from '@/hooks/queries/discord/useDiscordGuildInfoQuery';
import HeroBanner from '@/components/ui/HeroBanner';
import { getGuildBannerUrl, getGuildIconUrl } from '@/lib/guild-visuals';
import { ADMINISTRATOR, getInitials, hasBitFlagPermission } from '@/lib/utils';
import GuildHeroStats from '../GuildHeroStats';
import { IGuildHeroProps } from './GuildHero';

import styles from './styles.module.scss';

/** Suspense component: render inside an `AsyncBoundary`. */
const GuildHero = ({ guildId }: IGuildHeroProps) => {
  const { data: guild } = useDiscordGuildInfoQuery(guildId);
  const iconUrl = getGuildIconUrl(guild.id, guild.icon, 256);
  const role = guild.owner
    ? 'Owner'
    : hasBitFlagPermission(guild.permissions, ADMINISTRATOR) ? 'Admin' : 'Manager';

  return (
    <section className={styles.hero} aria-labelledby="guild-hero-title">
      <HeroBanner seed={guild.id} imageUrl={getGuildBannerUrl(guild.id, guild.banner)} className={styles.banner}>
        <GuildHeroStats guild={guild} />
      </HeroBanner>

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
