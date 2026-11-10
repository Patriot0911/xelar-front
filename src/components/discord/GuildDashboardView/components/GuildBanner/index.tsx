'use client';

import { useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import { getGuildBannerUrl, getGuildGradient } from '@/lib/guild-visuals';
import { IGuildBannerProps } from './GuildBanner';

import styles from './styles.module.scss';

/** The server's Discord banner, or a gradient generated from its id when it has none (or it fails to load). */
const GuildBanner = ({ guildId, banner, className, children }: IGuildBannerProps) => {
  const [hasImageError, setHasImageError] = useState(false);
  const bannerUrl = getGuildBannerUrl(guildId, banner);
  const gradient = useMemo(() => getGuildGradient(guildId), [guildId]);
  const showImage = Boolean(bannerUrl) && !hasImageError;

  return (
    <div className={cn(styles.banner, className)} style={{ background: gradient.css }}>
      {showImage ? (
        <img
          src={bannerUrl!}
          alt=""
          className={styles.image}
          onError={() => setHasImageError(true)}
        />
      ) : (
        <div className={styles.pattern} aria-hidden />
      )}
      <div className={styles.shade} aria-hidden />
      {children}
    </div>
  );
};

export default GuildBanner;
