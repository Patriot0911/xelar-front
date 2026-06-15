'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { isActive, NAV_LIST } from '../../../nav-data';
import styles from './styles.module.scss';
import XelarLogo from '@/components/ui/logos/XelarLogo';
import DashboardUserCard from '../../../DashboardUserCard';
import { useFilteredNavSections } from '@/hooks/shared/useFilteredNavSections';

const DashboardSidebar = () => {
  const pathname = usePathname();
  const filteredSections = useFilteredNavSections(NAV_LIST);

  return (
    <aside className={styles.sidebar}>
      <XelarLogo />

      {filteredSections.map((section) => (
        <nav className={styles.navSection} key={section.label}>
          <p className={styles.navGroupHead}>
            <span className={styles.roleDot} />
            <span className={styles.groupLabel}>{section.label}</span>
            <span className={styles.groupLine} />
          </p>
          {section.items.map(({ label, href, icon: Icon }) => (
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
      ))}

      <div className={styles.spacer} />

      <DashboardUserCard />
    </aside>
  );
}


export default DashboardSidebar;
