import { SiDiscord } from 'react-icons/si';

import styles from './styles.module.scss';

const AuthVisual = () => {
  return (
    <div className={styles.visual}>
      <div className={styles.visualCard}>
        <div className={styles.visualKicker}>
          <span className={styles.dot} />
          live · stream notifications
        </div>

        <div className={styles.tile}>
          <div className={styles.tilePlatform}>
            <span className={`${styles.platformDot} ${styles.twitch}`} />
            twitch.tv
          </div>
          <div className={styles.tileUser}>
            <div className={styles.tileAvatar}>N</div>
            <div>
              <div className={styles.tileName}>nightowl_streams</div>
              <div className={styles.tileSub}>went live · stream.online event</div>
            </div>
          </div>
        </div>

        <div className={styles.pipe}>
          <div className={styles.pipeLine} />
          <span className={styles.pipeChip}>Xelar</span>
          <div className={styles.pipeLine} />
        </div>

        <div className={styles.tile}>
          <div className={styles.tilePlatform}>
            <span className={`${styles.platformDot} ${styles.discord}`} />
            discord · nightowl HQ
          </div>
          <div className={styles.tileUser}>
            <div className={styles.tileAvatar} style={{ background: '#5865F2' }}>
              <SiDiscord size={18} color="white" />
            </div>
            <div>
              <div className={styles.tileName}>#live-now</div>
              <div className={styles.tileSub}>notification sent · 1 second ago</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthVisual;
