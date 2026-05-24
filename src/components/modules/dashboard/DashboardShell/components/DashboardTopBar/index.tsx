'use client';

import { usePathname } from 'next/navigation';
import { LuBell } from 'react-icons/lu';

import styles from './styles.module.scss';

type Crumb = [string, string, string];

const BREADCRUMBS: Record<string, Crumb> = {
  '/dashboard':             ['workspace', 'main',         'overview'],
  '/dashboard/twitch-apps': ['workspace', 'integrations', 'twitch apps'],
  '/dashboard/bridges':     ['workspace', 'integrations', 'bridges'],
  '/dashboard/channels':    ['workspace', 'integrations', 'channels'],
  '/dashboard/activity':    ['workspace', 'main',         'activity'],
  '/dashboard/webhooks':    ['workspace', 'configure',    'webhooks'],
  '/dashboard/settings':    ['workspace', 'configure',    'settings'],
};

const DashboardTopBar = () => {
  const pathname = usePathname();
  const [root, mid, leaf] =
    BREADCRUMBS[pathname] ?? ['workspace', 'main', pathname.split('/').pop() ?? ''];

  return (
    <div className={styles.topbar}>
      <div className={styles.crumbs}>
        <span>{root}</span>
        <span className={styles.crumbSep}>/</span>
        <span>{mid}</span>
        <span className={styles.crumbSep}>/</span>
        <span className={styles.crumbCur}>{leaf}</span>
      </div>

      <div className={styles.spacer} />

      {/* <button type="button" className={styles.bell} aria-label="Notifications">
        <LuBell size={16} />
        <span className={styles.bellDot} aria-hidden="true" />
      </button> */}
    </div>
  );
}

export default DashboardTopBar;
