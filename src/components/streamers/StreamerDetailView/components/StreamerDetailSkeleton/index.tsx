import styles from './styles.module.scss';

const TWITCH_ITEMS = 4;
const ACCOUNT_ITEMS = 3;

/** Loading state in the streamer page's own shape (panel, banner, identity, details, logs), so nothing jumps when the data arrives. */
const StreamerDetailSkeleton = () => (
  <div className={styles.root} role="status" aria-label="Loading streamer">
    <div className={styles.banner} />

    <div className={styles.identity}>
      <div className={styles.avatar} />
      <div className={styles.lines}>
        <span className={styles.name} />
        <span className={styles.id} />
      </div>
    </div>

    <div className={styles.details}>
      <div className={styles.group}>
        <span className={styles.title} />
        <div className={styles.grid}>
          {Array.from({ length: TWITCH_ITEMS }, (_, i) => (
            <div key={i} className={styles.item}>
              <span className={styles.label} />
              <span className={styles.value} />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.group}>
        <span className={styles.title} />
        <span className={styles.chips} />
      </div>

      <div className={`${styles.group} ${styles.wide}`}>
        <span className={styles.title} />
        <div className={styles.grid}>
          {Array.from({ length: ACCOUNT_ITEMS }, (_, i) => (
            <div key={i} className={styles.item}>
              <span className={styles.label} />
              <span className={styles.value} />
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className={styles.activity}>
      <span className={styles.title} />
      <div className={styles.table} />
    </div>
  </div>
);

export default StreamerDetailSkeleton;
