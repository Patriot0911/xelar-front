'use client';

import { useEffect, useMemo } from 'react';
import { toast } from 'sonner';
import { LuCircleDot, LuCopy, LuExternalLink, LuType } from 'react-icons/lu';
import useDiscordGuildInfoQuery from '@/hooks/queries/discord/useDiscordGuildInfoQuery';
import useFavoriteGuilds from '@/hooks/shared/useFavoriteGuilds';
import { toFavoriteGuild } from '@/lib/favorite-guilds';
import HeroBanner from '@/components/ui/HeroBanner';
import ActionsMenu from '@/components/ui/ActionsMenu';
import { IActionsMenuItem } from '@/components/ui/ActionsMenu/ActionsMenu';
import { getGuildBannerUrl, getGuildIconUrl } from '@/lib/guild-visuals';
import { getInitials } from '@/lib/utils';
import { getGuildAccessRole, GUILD_ACCESS_ROLE_LABELS } from '@/lib/guild-access';
import GuildHeroStats from '../GuildHeroStats';
import GuildFavoriteToggle from '../GuildFavoriteToggle';
import { IGuildHeroProps } from './GuildHero';

import styles from './styles.module.scss';

/** Suspense component: render inside an `AsyncBoundary`. */
const GuildHero = ({ guildId }: IGuildHeroProps) => {
  const { data: guild } = useDiscordGuildInfoQuery(guildId);
  const iconUrl = getGuildIconUrl(guild.id, guild.icon, 256);
  const role = GUILD_ACCESS_ROLE_LABELS[getGuildAccessRole(guild)];
  const favorite = useMemo(() => toFavoriteGuild(guild), [guild]);
  const { update: updateFavorite } = useFavoriteGuilds();

  // A saved server may have been renamed or got a new logo since — keep the nav entry current.
  useEffect(() => {
    updateFavorite(favorite);
  }, [favorite, updateFavorite]);

  const copy = async (value: string, what: string) => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success(`${what} copied`);
    } catch {
      toast.error('Couldn’t copy to the clipboard');
    }
  };

  const actions: IActionsMenuItem[] = [
    { key: 'copy-id', label: 'Copy server ID', icon: LuCopy, onSelect: () => copy(guild.id, 'Server ID') },
    { key: 'copy-name', label: 'Copy server name', icon: LuType, onSelect: () => copy(guild.name, 'Server name') },
    {
      key: 'open-discord',
      label: 'Open in Discord',
      icon: LuExternalLink,
      onSelect: () => window.open(`https://discord.com/channels/${guild.id}`, '_blank', 'noopener,noreferrer'),
    },
  ];

  return (
    <section className={styles.hero} aria-labelledby="guild-hero-title">
      <GuildFavoriteToggle guild={favorite} className={styles.favorite} />

      <HeroBanner
        seed={guild.id}
        imageUrl={getGuildBannerUrl(guild.id, guild.banner)}
        className={styles.banner}
        fadeInto="var(--panel)"
      >
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

        <ActionsMenu items={actions} label="Server actions" className={styles.actions} />
      </div>
    </section>
  );
};

export default GuildHero;
