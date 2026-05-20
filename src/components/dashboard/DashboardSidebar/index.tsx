'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LuHouse,
  LuArrowLeftRight,
  LuMessageSquare,
  LuSettings,
  LuTv,
  LuSearch,
  LuChevronsUpDown,
  LuEllipsis,
  LuActivity,
  LuWebhook,
  LuTriangleAlert,
} from 'react-icons/lu';
import { Logo } from '@/components/common/logo';
import useMeQuery from '@/hooks/queries/auth/useMeQuery';
import styles from './styles.module.scss';

const NAV_MAIN = [
  { label: 'Overview',   href: '/dashboard',             icon: LuHouse },
  { label: 'Twitch Apps',href: '/dashboard/twitch-apps', icon: LuTv },
  { label: 'Bridges',    href: '/dashboard/bridges',     icon: LuArrowLeftRight },
  { label: 'Channels',   href: '/dashboard/channels',    icon: LuMessageSquare },
  { label: 'Activity',   href: '/dashboard/activity',    icon: LuActivity },
];

const NAV_CONFIGURE = [
  { label: 'Webhooks', href: '/dashboard/webhooks', icon: LuWebhook },
  { label: 'Settings', href: '/dashboard/settings', icon: LuSettings },
];

function isActive(pathname: string, href: string) {
  if (href === '/dashboard') return pathname === href;
  return pathname.startsWith(href);
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export function DashboardSidebar() {
  const pathname = usePathname();
  const { data: meData } = useMeQuery();
  const displayName = meData?.displayName ?? 'User';

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <Logo size={22} />
      </div>

      <div className={styles.org}>
        <div className={styles.orgMark}>X</div>
        <div className={styles.orgMeta}>
          <span className={styles.orgName}>Xelar</span>
          <span className={styles.orgPlan}>FREE PLAN · ORG/MAIN</span>
        </div>
        <button className={styles.orgChev} type="button">
          <LuChevronsUpDown size={12} />
        </button>
      </div>

      <div className={styles.search}>
        <LuSearch size={13} />
        <span className={styles.searchLabel}>Quick search</span>
        <span className={styles.searchKbd}>⌘K</span>
      </div>

      <nav className={styles.navSection}>
        <p className={styles.navGroupHead}>Main</p>
        {NAV_MAIN.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`${styles.navItem} ${isActive(pathname, href) ? styles.active : ''}`}
          >
            <Icon size={15} />
            {label}
          </Link>
        ))}
      </nav>

      <nav className={styles.navSection}>
        <p className={styles.navGroupHead}>Configure</p>
        {NAV_CONFIGURE.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`${styles.navItem} ${isActive(pathname, href) ? styles.active : ''}`}
          >
            <Icon size={15} />
            {label}
          </Link>
        ))}
      </nav>

      <div className={styles.spacer} />

      <div className={styles.alert}>
        <LuTriangleAlert size={12} className={styles.alertIco} />
        <div className={styles.alertMeta}>
          <span className={styles.alertTitle}>1 webhook degraded</span>
          <span className={styles.alertSub}>Dev Sandbox · 502 since 3h</span>
        </div>
      </div>

      <div className={styles.user}>
        <div className={styles.userAv}>{getInitials(displayName)}</div>
        <div className={styles.userMeta}>
          <span className={styles.userName}>{displayName}</span>
          <span className={styles.userSub}>
            {meData?.discordId ? `discord · ${meData.discordId}` : 'workspace'}
          </span>
        </div>
        <button type="button" className={styles.userBtn}>
          <LuEllipsis size={14} />
        </button>
      </div>
    </aside>
  );
}
