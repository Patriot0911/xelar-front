
import styles from './styles.module.scss';

const XelarLogo = () => {
  return (
    <div className={styles.brand}>
      <span className={styles.wm}>
        <span className={styles.wmX}>X</span>
        <span className={styles.wmText}>elar</span>
      </span>
      <span className={styles.wmDot} aria-hidden="true" />
    </div>
  );
}

export default XelarLogo;
