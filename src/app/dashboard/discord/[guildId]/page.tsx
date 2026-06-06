'use client';

import { use } from 'react';
import PageHeader from '@/components/ui/PageHeader';
import PageContent from '@/components/ui/PageContent';
import GuildDashboardView from '@/components/discord/GuildDashboardView';

interface IProps {
  params: Promise<{ guildId: string }>;
}

export default function GuildNotificationsPage({ params }: IProps) {
  const { guildId } = use(params);

  return (
    <>
      <PageHeader
        eyebrow="Discord · Server"
        title="Server Dashboard"
      />
      <PageContent>
        <GuildDashboardView guildId={guildId} />
      </PageContent>
    </>
  );
}
