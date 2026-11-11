'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import DiscordService, { DiscordQueryKey } from '@/lib/services/discord.service';
import type { IDiscordGuildModel } from '@/lib/models/discord';
import { getGuildIconUrl } from '@/lib/guild-visuals';
import { getInitials } from '@/lib/utils';
import { IGuildCellProps } from './GuildCell';

import styles from './styles.module.scss';

/**
 * Server a notification is attached to. Name / icon come from the user's guild list
 * (same cache as the Discord Servers page); falls back to the raw id when the user has no access anymore.
 */
const GuildCell = ({ guild }: IGuildCellProps) => {
  // Non-suspense on purpose: a table cell must not suspend the whole table.
  const { data: guilds } = useQuery<IDiscordGuildModel[]>({
    queryKey: [DiscordQueryKey.Guilds],
    queryFn: DiscordService.getGuilds,
    retry: false,
    enabled: !!guild,
  });

  if (!guild) return <span className={styles.muted}>—</span>;

  const info = guilds?.find((item) => item.id === guild.discordGuildId);
  if (!info) {
    return <span className={styles.fallback} title={guild.discordGuildId}>{guild.discordGuildId}</span>;
  }

  const iconUrl = getGuildIconUrl(info.id, info.icon, 64);
  const content = (
    <>
      {iconUrl
        ? <img src={iconUrl} alt="" className={styles.avatar} width={24} height={24} loading="lazy" />
        : <span className={styles.avatarFallback} aria-hidden>{getInitials(info.name)}</span>}
      <span className={styles.name}>{info.name}</span>
    </>
  );

  return info.hasBot ? (
    <Link href={`/dashboard/discord/${info.id}`} className={styles.guild} title={`Open ${info.name}`}>
      {content}
    </Link>
  ) : (
    <span className={styles.guild} title={info.name}>{content}</span>
  );
};

export default GuildCell;
