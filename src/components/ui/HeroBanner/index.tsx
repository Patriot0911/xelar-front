'use client';

import { useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import { getSeedGradient } from '@/lib/seed-gradient';
import { IHeroBannerProps } from './HeroBanner';

import styles from './styles.module.scss';

/**
 * Wide page banner: an image, or a gradient generated from `seed`. The bottom fades into the page
 * background so content overlapping the edge stays readable. Children are laid over the banner.
 */
const HeroBanner = ({ seed, imageUrl, className, children }: IHeroBannerProps) => {
  const [hasImageError, setHasImageError] = useState(false);
  const gradient = useMemo(() => getSeedGradient(seed), [seed]);
  const showImage = Boolean(imageUrl) && !hasImageError;

  return (
    <div className={cn(styles.banner, className)} style={{ background: gradient.css }}>
      {showImage ? (
        <img src={imageUrl!} alt="" className={styles.image} onError={() => setHasImageError(true)} />
      ) : (
        <div className={styles.pattern} aria-hidden />
      )}
      <div className={styles.shade} aria-hidden />
      {children}
    </div>
  );
};

export default HeroBanner;
