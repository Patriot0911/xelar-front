'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_MAIN, NAV_CONFIGURE, NAV_NOTIFICATIONS, isActive } from '../../../nav-data';
import styles from './styles.module.scss';
import XelarLogo from '@/components/ui/logos/XelarLogo';
import DashboardUserCard from '../../../DashboardUserCard';
import { useFilteredNavItems } from '@/hooks/shared/useFilteredNavItems';

const DashboardSidebar = () => {
  const pathname = usePathname();
  const mainItems = useFilteredNavItems(NAV_MAIN);
  const notificationsItems = useFilteredNavItems(NAV_NOTIFICATIONS);
  const configureItems = useFilteredNavItems(NAV_CONFIGURE);

  return (
    <aside className={styles.sidebar}>
      <XelarLogo />

      {/* Main nav */}
      {mainItems.length > 0 && (
        <nav className={styles.navSection}>
          <p className={styles.navGroupHead}>
            <span className={styles.roleDot} />
            <span className={styles.groupLabel}>Main</span>
            <span className={styles.groupLine} />
          </p>
          {mainItems.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`${styles.navItem} ${isActive(pathname, href) ? styles.active : ''}`}
            >
              <Icon size={16} />
              <span className={styles.navLabel}>{label}</span>
              <span className={styles.tooltip} aria-hidden="true">{label}</span>
            </Link>
          ))}
        </nav>
      )}

      {/* Notifications nav */}
      {notificationsItems.length > 0 && (
        <nav className={styles.navSection}>
          <p className={styles.navGroupHead}>
            <span className={styles.roleDot} />
            <span className={styles.groupLabel}>Notifications</span>
            <span className={styles.groupLine} />
          </p>
          {notificationsItems.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`${styles.navItem} ${isActive(pathname, href) ? styles.active : ''}`}
            >
              <Icon size={16} />
              <span className={styles.navLabel}>{label}</span>
              <span className={styles.tooltip} aria-hidden="true">{label}</span>
            </Link>
          ))}
        </nav>
      )}

      {/* Configure nav */}
      {configureItems.length > 0 && (
        <nav className={styles.navSection}>
          <p className={styles.navGroupHead}>
            <span className={styles.roleDot} />
            <span className={styles.groupLabel}>Configure</span>
            <span className={styles.groupLine} />
          </p>
          {configureItems.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`${styles.navItem} ${isActive(pathname, href) ? styles.active : ''}`}
            >
              <Icon size={16} />
              <span className={styles.navLabel}>{label}</span>
              <span className={styles.tooltip} aria-hidden="true">{label}</span>
            </Link>
          ))}
        </nav>
      )}

      <div className={styles.spacer} />

      <DashboardUserCard />
    </aside>
  );
}


export default DashboardSidebar;
