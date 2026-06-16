import { LuUnplug } from 'react-icons/lu';
import styles from './styles.module.scss';

const DISCORD_AUTH_URL = `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'}/api/auth/discord`;

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
        <form method="post" action={DISCORD_AUTH_URL}>
          <button type="submit" className={styles.button}>
            Reconnect Discord
          </button>
        </form>
      </div>
    </div>
  );
};

export default DiscordReconnectBlocker;
