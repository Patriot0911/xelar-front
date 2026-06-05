import PageHeader from '@/components/ui/PageHeader';
import PageContent from '@/components/ui/PageContent';
import AddRole from '@/components/roles/AddRole';
import { RolesTable } from '@/components/roles/RolesTable';
import PermissionGuard from '@/components/common/PermissionGuard';
import { Permission } from '@/lib/constants/permissions';

import styles from './page.module.scss';

export default function RolesPage() {
  return (
    <PermissionGuard requiredPermissions={[Permission.READ_ROLES, Permission.MANAGE_ROLES]}>
      <PageHeader
        eyebrow="Access control · Roles"
        title="Roles"
      >
        <div className={styles.pageHeadRight}>
          <AddRole />
        </div>
      </PageHeader>
      <PageContent>
        <RolesTable />
      </PageContent>
    </PermissionGuard>
  );
}
