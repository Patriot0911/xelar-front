import styles from './styles.module.scss';

const ModalHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerEyebrow}>Integration · Twitch</div>
      <span className={styles.headerTitle}>
        Add Twitch App
      </span>
      <p className={styles.headerSub}>
        Paste credentials from your Twitch Developer Console. Xelar uses them to route
        EventSub webhooks into your bridges.
      </p>
    </header>
  );
}

export default ModalHeader;
