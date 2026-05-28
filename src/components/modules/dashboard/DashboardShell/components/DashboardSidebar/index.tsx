'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_MAIN, NAV_CONFIGURE, isActive } from '../../../nav-data';
import styles from './styles.module.scss';
import XelarLogo from '@/components/ui/logos/XelarLogo';
import DashboardUserCard from '../../../DashboardUserCard';

const DashboardSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <XelarLogo />

      {/* Main nav */}
      <nav className={styles.navSection}>
        <p className={styles.navGroupHead}>
          <span className={styles.roleDot} />
          <span className={styles.groupLabel}>Main</span>
          <span className={styles.groupLine} />
        </p>
        {NAV_MAIN.map(({ label, href, icon: Icon }) => (
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

      {/* Configure nav */}
      <nav className={styles.navSection}>
        <p className={styles.navGroupHead}>
          <span className={styles.roleDot} />
          <span className={styles.groupLabel}>Configure</span>
          <span className={styles.groupLine} />
        </p>
        {NAV_CONFIGURE.map(({ label, href, icon: Icon }) => (
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

      <div className={styles.spacer} />

      <DashboardUserCard />
    </aside>
  );
}


export default DashboardSidebar;
