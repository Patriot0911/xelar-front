import PageHeader from '@/components/ui/PageHeader';
import PageContent from '@/components/ui/PageContent';
import MyNotificationsView from '@/components/notifications/MyNotificationsView';

export default function NotificationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Notifications"
        title="My Notifications"
        description="Discord Bot and Webhook notifications you created, across all servers."
      />
      <PageContent>
        <MyNotificationsView />
      </PageContent>
    </>
  );
}
