'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LuMenu,
  LuX,
} from 'react-icons/lu';
import { getActiveHref } from '../../../nav-data';
import NavItemIcon from '../../../NavItemIcon';
import styles from './styles.module.scss';
import DashboardUserCard from '../../../DashboardUserCard';
import useNavSections from '@/hooks/shared/useNavSections';

const DashboardMobileNav = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();
  const sections = useNavSections();
  const activeHref = getActiveHref(pathname, sections);

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

        {sections.length > 0 && (
          <nav className={styles.navSection}>
            <p className={styles.navGroupHead}>Main</p>
            {sections.map((section) => (
              <div key={section.key}>
                <p className={styles.navGroupHead}>{section.label}</p>
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={item.href === activeHref ? 'page' : undefined}
                    className={`${styles.navItem} ${item.href === activeHref ? styles.navActive : ''}`}
                    onClick={closeDrawer}
                  >
                    <NavItemIcon item={item} />
                    <span className={styles.navLabel}>{item.label}</span>
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
