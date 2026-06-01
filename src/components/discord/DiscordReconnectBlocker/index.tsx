import Link from 'next/link';
import { LuUnplug } from 'react-icons/lu';
import styles from './styles.module.scss';

const DiscordReconnectBlocker = () => {
  return (
    <div className={styles.blocker}>
      <div className={styles.card}>
        <div className={styles.iconWrap}>
          <LuUnplug size={28} />
        </div>
        <h3 className={styles.title}>Discord reconnection required</h3>
        <p className={styles.description}>
          Your Discord access has expired or was revoked. Reconnect your Discord account to continue.
        </p>
        <Link href="/auth/discord" className={styles.button}>
          Reconnect Discord
        </Link>
      </div>
    </div>
  );
};

export default DiscordReconnectBlocker;
