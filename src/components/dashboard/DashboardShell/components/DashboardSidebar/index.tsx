'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getActiveHref } from '../../../nav-data';
import NavItemIcon from '../../../NavItemIcon';
import styles from './styles.module.scss';
import XelarLogo from '@/components/ui/logos/XelarLogo';
import DashboardUserCard from '../../../DashboardUserCard';
import useNavSections from '@/hooks/shared/useNavSections';

const DashboardSidebar = () => {
  const pathname = usePathname();
  const sections = useNavSections();
  const activeHref = getActiveHref(pathname, sections);

  return (
    <aside className={styles.sidebar}>
      <Link href="/" aria-label="Xelar home" className={styles.logoLink}>
        <XelarLogo />
      </Link>

      {sections.map((section) => (
        <nav className={styles.navSection} key={section.key} aria-label={section.label}>
          <p className={styles.navGroupHead}>
            <span className={styles.roleDot} />
            <span className={styles.groupLabel}>{section.label}</span>
            <span className={styles.groupLine} />
          </p>
          {section.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={item.href === activeHref ? 'page' : undefined}
              className={`${styles.navItem} ${item.href === activeHref ? styles.active : ''}`}
            >
              <NavItemIcon item={item} />
              <span className={styles.navLabel}>{item.label}</span>
              <span className={styles.tooltip} aria-hidden="true">{item.label}</span>
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
