import styles from './styles.module.scss';

const AuthBgEffects = () => {
  return (
    <div className={styles.bgAura} aria-hidden="true">
      <div className={styles.aura} />
      <div className={styles.aura} />
      <div className={styles.aura} />
      <div className={styles.gridbg} />
    </div>
  );
}

export default AuthBgEffects;
