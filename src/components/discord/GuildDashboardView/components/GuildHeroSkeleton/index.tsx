import Loading from '@/components/ui/Loading';

import styles from './styles.module.scss';

/** Suspense fallback with the hero's footprint, so the page doesn't jump when the data arrives. */
const GuildHeroSkeleton = () => (
  <div className={styles.skeleton}>
    <div className={styles.banner}>
      <Loading type="inline" tone="discord" title="Loading server" />
    </div>
    <div className={styles.identity}>
      <div className={styles.avatar} />
      <div className={styles.lines}>
        <span className={styles.lineShort} />
        <span className={styles.line} />
      </div>
    </div>
  </div>
);

export default GuildHeroSkeleton;
