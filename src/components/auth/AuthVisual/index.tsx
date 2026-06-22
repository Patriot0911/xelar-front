import { SiDiscord } from 'react-icons/si';

import styles from './styles.module.scss';

const AuthVisual = () => {
  return (
    <div className={styles.visual}>
      <div className={styles.glow} />
      <div className={styles.glow2} />

      <div className={styles.visualCard}>
        <div className={styles.visualKicker}>
          <span className={styles.dot} />
          stream events · routed instantly
        </div>

        <div className={styles.tile}>
          <div className={styles.tilePlatform}>
            <span className={`${styles.platformDot} ${styles.twitch}`} />
            twitch.tv
          </div>
          <div className={styles.tileUser}>
            <div className={styles.tileAvatar} />
            <div className={styles.skeletonLines}>
              <div className={styles.skeletonLine} style={{ width: '58%' }} />
              <div className={styles.skeletonLine} style={{ width: '42%', animationDelay: '0.4s' }} />
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
            discord
          </div>
          <div className={styles.tileUser}>
            <div className={styles.tileAvatar} style={{ background: '#5865F2' }}>
              <SiDiscord size={16} color="white" />
            </div>
            <div className={styles.skeletonLines}>
              <div className={styles.skeletonLine} style={{ width: '45%', animationDelay: '0.2s' }} />
              <div className={styles.skeletonLine} style={{ width: '68%', animationDelay: '0.6s' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthVisual;
