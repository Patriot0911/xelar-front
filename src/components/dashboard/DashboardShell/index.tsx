import type { ReactNode } from 'react';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import styles from './styles.module.scss';

interface DashboardShellProps {
  children: ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className={styles.shell}>
      <DashboardSidebar />
      <main className={styles.main}>{children}</main>
    </div>
  );
}
