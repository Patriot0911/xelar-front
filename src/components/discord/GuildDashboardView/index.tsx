'use client';

import { useState } from 'react';
import AsyncBoundary from '@/components/common/AsyncBoundary';
import DiscordReconnectBlocker from '@/components/discord/DiscordReconnectBlocker';
import GuildNotificationsView from '@/components/discord/GuildNotificationsView';
import GuildLogsSection from '@/components/discord/GuildManagementView/GuildLogsSection';
import Loading from '@/components/ui/Loading';
import { GuildDashboardTab } from '@/lib/constants/guild-dashboard';
import { isDiscordAuthError } from '@/lib/errors';
import GuildHero from './components/GuildHero';
import GuildHeroSkeleton from './components/GuildHeroSkeleton';
import GuildSectionNav from './components/GuildSectionNav';
import GuildSettingsPanel from './components/GuildSettingsPanel';
import { IGuildDashboardViewProps } from './GuildDashboardView';

import styles from './styles.module.scss';

const renderDiscordAuthError = (error: unknown) => (isDiscordAuthError(error) ? <DiscordReconnectBlocker /> : undefined);

const GuildDashboardView = ({ guildId }: IGuildDashboardViewProps) => {
  const [activeTab, setActiveTab] = useState<GuildDashboardTab>(GuildDashboardTab.Notifications);

  return (
    <div className={styles.layout}>
      <AsyncBoundary loading={<GuildHeroSkeleton />} renderError={renderDiscordAuthError}>
        <GuildHero guildId={guildId} />
      </AsyncBoundary>

      <div className={styles.main}>
        <GuildSectionNav value={activeTab} onChange={setActiveTab} />

        {/* Keyed by tab so switching tabs also clears an error shown for the other one. */}
        <AsyncBoundary
          key={activeTab}
          compact
          loading={<Loading type="block" tone="discord" />}
          renderError={renderDiscordAuthError}
        >
          {activeTab === GuildDashboardTab.Notifications && <GuildNotificationsView guildId={guildId} />}
          {activeTab === GuildDashboardTab.Logs && <GuildLogsSection guildId={guildId} />}
          {activeTab === GuildDashboardTab.Settings && <GuildSettingsPanel guildId={guildId} />}
        </AsyncBoundary>
      </div>
    </div>
  );
};

export default GuildDashboardView;
