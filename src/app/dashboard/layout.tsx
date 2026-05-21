import AuthGuard from '@/components/common/AuthGuard';
import { DashboardShell } from '@/components/modules/dashboard/DashboardShell';
import { PropsWithChildren } from 'react';

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <AuthGuard>
      <DashboardShell>{children}</DashboardShell>
    </AuthGuard>
  );
}
