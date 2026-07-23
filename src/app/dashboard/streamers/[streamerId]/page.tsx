import { use } from 'react';
import PageHeader from '@/components/ui/PageHeader';
import PageContent from '@/components/ui/PageContent';
import PermissionGuard from '@/components/common/PermissionGuard';
import { Permission } from '@/lib/constants/permissions';
import { StreamerDetailView } from '@/components/streamers/StreamerDetailView';

interface IProps {
  params: Promise<{ streamerId: string }>;
}

export default function StreamerDetailPage({ params }: IProps) {
  const { streamerId } = use(params);

  return (
    <PermissionGuard requiredPermissions={[Permission.ADMIN]}>
      <PageHeader
        eyebrow="Admin · Streamers"
        title="Streamer Details"
      />
      <PageContent>
        <StreamerDetailView streamerId={streamerId} />
      </PageContent>
    </PermissionGuard>
  );
}
