'use client';

import Link from 'next/link';
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
      <div className={styles.icon}>
        {iconUrl
          ? <img src={iconUrl} alt={guild.name} width={56} height={56} />
          : <span className={styles.initials}>{initials}</span>
        }
      </div>
      <div className={styles.meta}>
        <span className={styles.name}>{guild.name}</span>
        <span className={styles.members}>
          {guild.memberCount} members
        </span>
      </div>
    </Link>
  );
};

export default DiscordGuildCard;
