import { use } from 'react';
import PageHeader from '@/components/ui/PageHeader';
import PageContent from '@/components/ui/PageContent';
import PermissionGuard from '@/components/common/PermissionGuard';
import { Permission } from '@/lib/constants/permissions';
import { UserDetailView } from '@/components/users/UserDetailView';

interface IProps {
  params: Promise<{ userId: string }>;
}

export default function UserDetailPage({ params }: IProps) {
  const { userId } = use(params);

  return (
    <PermissionGuard requiredPermissions={[Permission.ADMIN]}>
      <PageHeader
        eyebrow="Admin · Users"
        title="User Details"
      />
      <PageContent>
        <UserDetailView userId={userId} />
      </PageContent>
    </PermissionGuard>
  );
}
