import PageHeader from '@/components/ui/PageHeader';
import PageContent from '@/components/ui/PageContent';
import AllNotificationsView from '@/components/notifications/AllNotificationsView';

export default function NotificationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Notifications"
        title="All Notifications"
        description="All your Discord Bot and Webhook notifications across all servers."
      />
      <PageContent>
        <AllNotificationsView />
      </PageContent>
    </>
  );
}
