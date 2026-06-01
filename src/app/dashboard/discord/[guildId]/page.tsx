import { use } from 'react';
import PageHeader from '@/components/ui/PageHeader';
import PageContent from '@/components/ui/PageContent';
import GuildNotificationsView from '@/components/discord/GuildNotificationsView';

interface IProps {
  params: Promise<{ guildId: string }>;
}

export default function GuildNotificationsPage({ params }: IProps) {
  const { guildId } = use(params);

  return (
    <>
      <PageHeader
        eyebrow="Notifications · Discord · Server"
        title="Server Notifications"
      />
      <PageContent>
        <GuildNotificationsView guildId={guildId} />
      </PageContent>
    </>
  );
}
