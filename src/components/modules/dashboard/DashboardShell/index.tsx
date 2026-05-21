import type { ReactNode } from 'react';
import styles from './styles.module.scss';
import { DashboardSidebar } from '../DashboardSidebar';
import { DashboardTopBar } from '../DashboardTopBar';

interface DashboardShellProps {
  children: ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className={styles.shell}>
      <DashboardSidebar />
      <div className={styles.content}>
        <DashboardTopBar />
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}
