import styles from './styles.module.scss';

const DashboardBgEffects = () => {
  return (
    <div className={styles.aura} aria-hidden="true">
      <div className={`${styles.a} ${styles.a1}`} />
      <div className={`${styles.a} ${styles.a2}`} />
      <div className={`${styles.a} ${styles.a3}`} />
      <div className={styles.gridbg} />
    </div>
  );
}

export default DashboardBgEffects;
