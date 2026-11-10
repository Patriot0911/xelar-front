'use client';

import ErrorFallback from '@/components/common/ErrorFallback';
import HeroBanner from '@/components/ui/HeroBanner';
import { IGuildHeroFallbackProps } from './GuildHeroFallback';

import styles from './styles.module.scss';

/**
 * Error state in the hero's own shape: the id is known even when the request failed, so the server
 * keeps its generated banner and the error sits on top of it instead of replacing the whole block.
 */
const GuildHeroFallback = ({ guildId, error, onRetry }: IGuildHeroFallbackProps) => (
  <HeroBanner seed={guildId} className={styles.banner}>
    <div className={styles.glass}>
      <ErrorFallback error={error} onRetry={onRetry} compact className={styles.state} />
    </div>
  </HeroBanner>
);

export default GuildHeroFallback;
