import PageHeader from '@/components/ui/PageHeader';
import PageContent from '@/components/ui/PageContent';
import PermissionGuard from '@/components/common/PermissionGuard';
import { Permission } from '@/lib/constants/permissions';
import { StreamersTable } from '@/components/streamers/StreamersTable';

export default function StreamersPage() {
  return (
    <PermissionGuard requiredPermissions={[Permission.ADMIN]}>
      <PageHeader
        eyebrow="Admin · Streamers"
        title="Streamers"
      />
      <PageContent>
        <StreamersTable />
      </PageContent>
    </PermissionGuard>
  );
}
