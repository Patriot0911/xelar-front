'use client';

import { usePathname } from 'next/navigation';
import { LuSearch, LuBell } from 'react-icons/lu';
import { Avatar } from '@/components/ui/avatar';
import useMeQuery from '@/hooks/queries/auth/useMeQuery';
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

const SEARCH_PLACEHOLDER: Record<string, string> = {
  '/dashboard/twitch-apps': 'Search apps, channels, events…',
  '/dashboard/bridges':     'Search bridges, channels…',
  '/dashboard/channels':    'Search channels…',
  '/dashboard/webhooks':    'Search webhooks…',
};

export function DashboardTopBar() {
  const pathname = usePathname();
  const { data: meData } = useMeQuery();
  const displayName = meData?.displayName ?? 'User';
  const [root, mid, leaf] = BREADCRUMBS[pathname] ?? ['workspace', 'main', pathname.split('/').pop() ?? ''];
  const placeholder = SEARCH_PLACEHOLDER[pathname] ?? 'Search…';

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

      <div className={styles.search}>
        <LuSearch size={13} />
        <span style={{ flex: 1 }}>{placeholder}</span>
        <span className={styles.searchKbd}>⌘K</span>
      </div>

      <button type="button" className={styles.iconBtn} aria-label="Notifications">
        <LuBell size={15} />
      </button>

      <div className={styles.userChip}>
        <Avatar initials={displayName} size="xs" />
        {displayName}
      </div>
    </div>
  );
}
