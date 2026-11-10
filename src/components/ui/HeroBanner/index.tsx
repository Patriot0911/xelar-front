'use client';

import { CSSProperties, useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import { getSeedGradient } from '@/lib/seed-gradient';
import { IHeroBannerProps } from './HeroBanner';

import styles from './styles.module.scss';

/**
 * Wide page banner: an image, or a gradient generated from `seed`. The bottom fades into the page
 * background so content overlapping the edge stays readable. Children are laid over the banner.
 */
const HeroBanner = ({ seed, imageUrl, className, fadeInto, children }: IHeroBannerProps) => {
  const [hasImageError, setHasImageError] = useState(false);
  const gradient = useMemo(() => getSeedGradient(seed), [seed]);
  const showImage = Boolean(imageUrl) && !hasImageError;
  const style = {
    background: gradient.css,
    ...(fadeInto && { '--hero-fade-color': fadeInto }),
  } as CSSProperties;

  return (
    <div className={cn(styles.banner, fadeInto && styles.fadeInto, className)} style={style}>
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
