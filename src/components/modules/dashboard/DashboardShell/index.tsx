import type { PropsWithChildren } from 'react';
import styles from './styles.module.scss';
import DashboardBgEffects from '../DashboardBgEffects';
import {
  DashboardMobileNav,
  DashboardTopBar,
  DashboardSidebar,
} from './components';

const DashboardShell = ({ children }: PropsWithChildren) => {
  return (
    <div className={styles.shell}>
      <DashboardBgEffects  />

      <DashboardSidebar />
      <div className={styles.content}>
        <DashboardTopBar />
        <main className={styles.main}>{children}</main>
      </div>

      <DashboardMobileNav />
    </div>
  );
}

export default DashboardShell;
