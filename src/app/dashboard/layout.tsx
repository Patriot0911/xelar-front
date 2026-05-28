import AuthGuard from '@/components/common/AuthGuard';
import DashboardShell from '@/components/dashboard/DashboardShell';
import { PropsWithChildren } from 'react';

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <AuthGuard>
      <DashboardShell>{children}</DashboardShell>
    </AuthGuard>
  );
}
