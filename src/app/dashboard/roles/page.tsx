import PageHeader from '@/components/ui/PageHeader';
import PageContent from '@/components/ui/PageContent';
import AddRole from '@/components/modules/roles/AddRole';
import { RolesTable } from '@/components/modules/roles/RolesTable';

import styles from './page.module.scss';

export default function RolesPage() {
  return (
    <>
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
    </>
  );
}
