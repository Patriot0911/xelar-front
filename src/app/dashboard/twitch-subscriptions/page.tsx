import PageHeader from '@/components/ui/PageHeader';
import PageContent from '@/components/ui/PageContent';
import TwitchSubscriptionsView from '@/components/twitch-subscriptions/TwitchSubscriptionsView';
import PermissionGuard from '@/components/common/PermissionGuard';
import { Permission } from '@/lib/constants/permissions';

export default function TwitchSubscriptionsPage() {
  return (
    <PermissionGuard requiredPermissions={[Permission.READ_APPS, Permission.MANAGE_APPS]}>
      <PageHeader
        eyebrow="Integration · Twitch · EventSub"
        title="Twitch Subscriptions"
        description="Manage local subscription records and inspect raw Twitch EventSub subscriptions."
      />
      <PageContent>
        <TwitchSubscriptionsView />
      </PageContent>
    </PermissionGuard>
  );
}
