import PageHeader from '@/components/ui/PageHeader';
import PageContent from '@/components/ui/PageContent';
import TwitchSubscriptionsView from '@/components/twitch-subscriptions/TwitchSubscriptionsView';

export default function TwitchSubscriptionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Integration · Twitch · EventSub"
        title="Twitch Subscriptions"
        description="Manage local subscription records and inspect raw Twitch EventSub subscriptions."
      />
      <PageContent>
        <TwitchSubscriptionsView />
      </PageContent>
    </>
  );
}
