'use client';

import { usePathname } from 'next/navigation';
import { LuBell } from 'react-icons/lu';

import styles from './styles.module.scss';

type Crumb = [string, string];

const BREADCRUMBS: Record<string, Crumb> = {
  '/dashboard':             ['main',         'overview'],
  '/dashboard/twitch-apps': ['integrations', 'twitch apps'],
  '/dashboard/bridges':     ['integrations', 'bridges'],
  '/dashboard/channels':    ['integrations', 'channels'],
  '/dashboard/activity':    ['main',         'activity'],
  '/dashboard/webhooks':    ['configure',    'webhooks'],
  '/dashboard/settings':    ['configure',    'settings'],
};

const DashboardTopBar = () => {
  const pathname = usePathname();
  const [root, mid] =
    BREADCRUMBS[pathname] ?? ['main', pathname.split('/').pop() ?? ''];

  return (
    <div className={styles.topbar}>
      <div className={styles.crumbs}>
        <span>{root}</span>
        <span className={styles.crumbSep}>/</span>
        <span>{mid}</span>
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
