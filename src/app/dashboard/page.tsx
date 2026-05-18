'use client';

import {
  LuHouse,
  LuArrowLeftRight,
  LuMessageSquare,
  LuSettings,
  LuLogOut,
  LuZap,
  LuArrowRight,
} from 'react-icons/lu';
import { Logo } from '@/components/common/logo';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { StatCard } from '@/components/ui/stat-card';
import { EmptyState } from '@/components/ui/empty-state';
import styles from './page.module.scss';
import useLogoutMutation from '@/hooks/mutations/auth/useLogoutMutation';
import useMeQuery from '@/hooks/queries/auth/useMeQuery';

const NAV = [
  { label: 'Overview', icon: LuHouse },
  { label: 'Bridges', icon: LuArrowLeftRight },
  { label: 'Channels', icon: LuMessageSquare },
  { label: 'Settings', icon: LuSettings },
];

const STATS = [
  { label: 'Active bridges', value: '0', sub: 'No bridges yet' },
  { label: 'Events sent', value: '0', sub: 'All time' },
  { label: 'Channels wired', value: '0', sub: 'Discord channels' },
  { label: 'Uptime', value: '—', sub: 'No active bridges' },
];

export default function DashboardPage() {
  const { data: meData } = useMeQuery();
  const logoutMutation = useLogoutMutation();

  const displayName = meData?.displayName ?? 'User';

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <Logo size={20} className={styles.sidebarLogo} />

          <nav>
            <p className={styles.navLabel}>Main</p>
            <div className={styles.navGroup}>
              {NAV.map(({ label, icon: Icon }) => (
                <button
                  key={label}
                  className={`${styles.navItem} ${label === 'Overview' ? styles.active : ''}`}
                >
                  <Icon size={16} />
                  {label}
                </button>
              ))}
            </div>
          </nav>

          <div className={styles.sidebarFoot}>
            <button className={styles.navItem} onClick={handleLogout}>
              <LuLogOut size={16} />
              Sign out
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className={styles.main}>
          <div className={styles.topBar}>
            <h1 className={styles.pageTitle}>Overview</h1>
            <div className={styles.userChip}>
              <Avatar initials={displayName} size="xs" />
              {displayName}
            </div>
          </div>

          <div className={styles.statsGrid}>
            {STATS.map((s) => (
              <StatCard key={s.label} {...s} />
            ))}
          </div>

          <EmptyState
            icon={<LuZap size={24} />}
            title="No bridges yet"
            description="Connect a Twitch channel and a Discord server to start routing stream events automatically."
            action={
              <Button size="sm">
                Create your first bridge
                <LuArrowRight size={14} />
              </Button>
            }
          />
        </main>
      </div>
    </div>
  );
}
