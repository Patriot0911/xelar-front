'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LuArrowRight } from 'react-icons/lu';
import { SiDiscord } from 'react-icons/si';
import { Logo } from '@/components/common/logo';
import styles from './page.module.scss';
import { useAppSelector } from '@/hooks/redux';
import { authStatusSelector } from '@/hooks/redux/auth';
import useMeQuery from '@/hooks/queries/auth/useMeQuery';

const DISCORD_AUTH_URL = `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'}/api/auth/discord`;

function AuthVisual() {
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
          <span className={styles.pipeChip}>× Xelar · 612ms</span>
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

export default function AuthPage() {
  const router = useRouter();
  const status = useAppSelector(authStatusSelector);
  const { isEnabled, } = useMeQuery();

  const isAuthenticated = !isEnabled && status !== 'guest';

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/dashboard');
    }
  }, [isAuthenticated, router]);

  return (
    <div className={styles.page}>
      <div className={styles.bgAura} aria-hidden="true">
        <div className={styles.aura} />
        <div className={styles.aura} />
        <div className={styles.aura} />
        <div className={styles.grid} />
      </div>

      <div className={styles.panel}>
        <div className={styles.panelTop}>
          <Logo size={22} />
        </div>

        <div className={styles.panelBody}>
          <h1 className={styles.headline}>
            Wire your first{' '}
            <span className={styles.grad}>bridge.</span>
          </h1>
          <p className={styles.sub}>
            Connect Discord to start routing stream events. Your bridges run quietly — you just show up when it matters.
          </p>

          <form method="post" action={DISCORD_AUTH_URL}>
            <button type="submit" className={styles.discordBtn}>
              <span className={styles.icon}>
                <SiDiscord size={20} />
              </span>
              <span className={styles.label}>Continue with Discord</span>
              <LuArrowRight size={16} className={styles.arrow} />
            </button>
          </form>
        </div>

        <div className={styles.panelFoot}>
          <div className={styles.footLinks}>
            <a href="#">Terms</a>
            <a href="#">Privacy</a>
            <a href="#">Status</a>
          </div>
          <span>© 2026 Xelar</span>
        </div>
      </div>

      <AuthVisual />
    </div>
  );
}
