'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LuMenu,
  LuX,
} from 'react-icons/lu';
import { isActive, NAV_LIST } from '../../../nav-data';
import styles from './styles.module.scss';
import DashboardUserCard from '../../../DashboardUserCard';
import { useFilteredNavSections } from '@/hooks/shared/useFilteredNavSections';

const DashboardMobileNav = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();
  const filteredSections = useFilteredNavSections(NAV_LIST);

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
        </button>
      </div>


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

        {filteredSections.length > 0 && (
          <nav className={styles.navSection}>
            <p className={styles.navGroupHead}>Main</p>
            {filteredSections.map((section) => (
              <div key={section.label}>
                <p className={styles.navGroupHead}>{section.label}</p>
                {section.items.map(({ label, href, icon: Icon }) => (
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
              </div>
            ))}
          </nav>
        )}

        <div className={styles.spacer} />

        <DashboardUserCard />
      </aside>
    </>
  );
}

export default DashboardMobileNav;
