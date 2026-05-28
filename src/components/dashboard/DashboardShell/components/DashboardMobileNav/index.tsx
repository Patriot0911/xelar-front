'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LuBell,
  LuEllipsis,
  LuMenu,
  LuX,
} from 'react-icons/lu';
import useMeQuery from '@/hooks/queries/auth/useMeQuery';
import { NAV_MAIN, NAV_CONFIGURE, isActive } from '../../../nav-data';
import styles from './styles.module.scss';
import DashboardUserCard from '../../../DashboardUserCard';

// 4 primary destinations for the bottom tab bar
const TAB_ITEMS = NAV_MAIN.slice(0, 4).map((item) => ({
  ...item,
  shortLabel: item.label === 'Overview' ? 'Home' : item.label,
}));

const DashboardMobileNav = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();
  const { data: meData } = useMeQuery();
  const displayName = meData?.displayName ?? 'User';

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <>
      {/* ── Mobile top bar — visible < 900px ────────────────────── */}
      <div className={styles.topbar}>
        <button
          className={styles.burger}
          type="button"
          aria-label="Open navigation menu"
          onClick={() => setDrawerOpen(true)}
        >
          <LuMenu size={18} />
        </button>

        <div className={styles.brand} aria-hidden="true">
          <span className={styles.wm}>
            <span className={styles.wmX}>X</span>elar
          </span>
        </div>

        <button className={styles.bellBtn} type="button" aria-label="Notifications">
          <LuBell size={18} />
          <span className={styles.bellDot} aria-hidden="true" />
        </button>
      </div>

      {/* ── Bottom tab bar — visible < 640px ────────────────────── */}
      <nav className={styles.tabbar} aria-label="Mobile navigation">
        {TAB_ITEMS.map(({ href, icon: Icon, shortLabel }) => (
          <Link
            key={href}
            href={href}
            className={`${styles.tab} ${isActive(pathname, href) ? styles.tabActive : ''}`}
          >
            <Icon size={20} />
            <span className={styles.tabLabel}>{shortLabel}</span>
          </Link>
        ))}
        <button
          className={styles.tab}
          type="button"
          aria-label="More navigation options"
          onClick={() => setDrawerOpen(true)}
        >
          <LuEllipsis size={20} />
          <span className={styles.tabLabel}>More</span>
        </button>
      </nav>

      {/* ── Veil backdrop ────────────────────────────────────────── */}
      <div
        className={`${styles.veil} ${drawerOpen ? styles.veilOpen : ''}`}
        aria-hidden="true"
        onClick={closeDrawer}
      />

      {/* ── Slide-out drawer ─────────────────────────────────────── */}
      <aside
        className={`${styles.drawer} ${drawerOpen ? styles.drawerOpen : ''}`}
        aria-label="Navigation menu"
        aria-hidden={!drawerOpen}
      >
        <button
          className={styles.drawerClose}
          type="button"
          aria-label="Close navigation menu"
          onClick={closeDrawer}
        >
          <LuX size={14} />
        </button>

        {/* Wordmark */}
        <span className={styles.wm}>
          <span className={styles.wmX}>X</span>elar
        </span>

        {/* Main nav */}
        <nav className={styles.navSection}>
          <p className={styles.navGroupHead}>Main</p>
          {NAV_MAIN.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`${styles.navItem} ${isActive(pathname, href) ? styles.navActive : ''}`}
              onClick={closeDrawer}
            >
              <Icon size={16} />
              {label}
            </Link>
          ))}
        </nav>

        {/* Configure nav */}
        <nav className={styles.navSection}>
          <p className={styles.navGroupHead}>Configure</p>
          {NAV_CONFIGURE.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`${styles.navItem} ${isActive(pathname, href) ? styles.navActive : ''}`}
              onClick={closeDrawer}
            >
              <Icon size={16} />
              {label}
            </Link>
          ))}
        </nav>

        <div className={styles.spacer} />

        <DashboardUserCard />
      </aside>
    </>
  );
}

export default DashboardMobileNav;
