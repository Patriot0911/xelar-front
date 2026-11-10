import styles from './styles.module.scss';

const ACCOUNT_ITEMS = 4;
const WALLET_ITEMS = 2;

/** Loading state in the user page's own shape (panel, banner, identity, details, tabs), so nothing jumps when the data arrives. */
const UserDetailSkeleton = () => (
  <div className={styles.root} role="status" aria-label="Loading user">
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
          {Array.from({ length: ACCOUNT_ITEMS }, (_, i) => (
            <div key={i} className={styles.item}>
              <span className={styles.label} />
              <span className={styles.value} />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.group}>
        <span className={styles.title} />
        <div className={styles.grid}>
          {Array.from({ length: WALLET_ITEMS }, (_, i) => (
            <div key={i} className={styles.item}>
              <span className={styles.label} />
              <span className={styles.value} />
            </div>
          ))}
        </div>
      </div>

      <div className={`${styles.group} ${styles.wide}`}>
        <span className={styles.title} />
        <span className={styles.chips} />
      </div>
    </div>

    <div className={styles.activity}>
      <div className={styles.tabs}>
        <span className={styles.tab} />
        <span className={styles.tab} />
        <span className={styles.tab} />
      </div>
      <div className={styles.table} />
    </div>
  </div>
);

export default UserDetailSkeleton;
