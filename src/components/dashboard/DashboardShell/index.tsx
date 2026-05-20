import type { ReactNode } from 'react';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { DashboardTopBar } from '@/components/dashboard/DashboardTopBar';
import styles from './styles.module.scss';

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
