'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LuHouse,
  LuArrowLeftRight,
  LuMessageSquare,
  LuSettings,
  LuLogOut,
  LuTv,
} from 'react-icons/lu';
import { Logo } from '@/components/common/logo';
import useLogoutMutation from '@/hooks/mutations/auth/useLogoutMutation';
import styles from './styles.module.scss';

const NAV = [
  { label: 'Overview', href: '/dashboard', icon: LuHouse },
  { label: 'Twitch Apps', href: '/dashboard/twitch-apps', icon: LuTv },
  { label: 'Bridges', href: '/dashboard/bridges', icon: LuArrowLeftRight },
  { label: 'Channels', href: '/dashboard/channels', icon: LuMessageSquare },
  { label: 'Settings', href: '/dashboard/settings', icon: LuSettings },
];

function isActive(pathname: string, href: string) {
  if (href === '/dashboard') return pathname === href;
  return pathname.startsWith(href);
}

export function DashboardSidebar() {
  const pathname = usePathname();
  const logoutMutation = useLogoutMutation();

  return (
    <aside className={styles.sidebar}>
      <Logo size={20} className={styles.logo} />

      <nav>
        <p className={styles.navLabel}>Main</p>
        <div className={styles.navGroup}>
          {NAV.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`${styles.navItem} ${isActive(pathname, href) ? styles.active : ''}`}
            >
              <Icon size={16} />
              {label}
            </Link>
          ))}
        </div>
      </nav>

      <div className={styles.foot}>
        <button
          className={styles.navItem}
          onClick={() => logoutMutation.mutate()}
          disabled={logoutMutation.isPending}
        >
          <LuLogOut size={16} />
          Sign out
        </button>
      </div>
    </aside>
  );
}
