import PageHeader from '@/components/ui/PageHeader';
import PageContent from '@/components/ui/PageContent';
import PermissionGuard from '@/components/common/PermissionGuard';
import { Permission } from '@/lib/constants/permissions';
import { UsersTable } from '@/components/users/UsersTable';

export default function UsersPage() {
  return (
    <PermissionGuard requiredPermissions={[Permission.ADMIN]}>
      <PageHeader
        eyebrow="Admin · Users"
        title="Users"
      />
      <PageContent>
        <UsersTable />
      </PageContent>
    </PermissionGuard>
  );
}
