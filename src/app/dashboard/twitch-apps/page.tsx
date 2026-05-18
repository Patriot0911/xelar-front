'use client';

import { LuTv } from 'react-icons/lu';
import { DashboardTopBar } from '@/components/dashboard/DashboardTopBar';
import { TwitchAppsTable } from '@/components/twitch-apps/TwitchAppsTable';
import { AddTwitchAppModal } from '@/components/twitch-apps/AddTwitchAppModal';
import { EmptyState } from '@/components/ui/empty-state';
import useTwitchAppsQuery from '@/hooks/queries/twitch/useTwitchAppsQuery';

export default function TwitchAppsPage() {
  const { data, isLoading } = useTwitchAppsQuery();
  const apps = data?.items ?? [];
  const hasApps = !isLoading && apps.length > 0;

  return (
    <>
      <DashboardTopBar
        title="Twitch Apps"
        action={hasApps ? <AddTwitchAppModal /> : undefined}
      />

      {isLoading || hasApps ? (
        <TwitchAppsTable apps={apps} isLoading={isLoading} />
      ) : (
        <EmptyState
          icon={<LuTv size={24} />}
          title="No Twitch apps yet"
          description="Register a Twitch application to start routing stream events through Xelar."
          action={<AddTwitchAppModal />}
        />
      )}
    </>
  );
}
