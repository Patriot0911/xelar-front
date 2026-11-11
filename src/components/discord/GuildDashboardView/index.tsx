'use client';

import { useState } from 'react';
import AsyncBoundary from '@/components/common/AsyncBoundary';
import DiscordReconnectBlocker from '@/components/discord/DiscordReconnectBlocker';
import GuildNotificationsView from '@/components/discord/GuildNotificationsView';
import GuildLogsSection from '@/components/discord/GuildManagementView/GuildLogsSection';
import Loading from '@/components/ui/Loading';
import { GUILD_DASHBOARD_TAB_LABELS, GuildDashboardTab } from '@/lib/constants/guild-dashboard';
import { isDiscordAuthError } from '@/lib/errors';
import GuildHero from './components/GuildHero';
import GuildHeroSkeleton from './components/GuildHeroSkeleton';
import GuildHeroFallback from './components/GuildHeroFallback';
import SectionTabs from '@/components/ui/SectionTabs';
import { ISectionTabItem } from '@/components/ui/SectionTabs/SectionTabs';
import { LuBell, LuScrollText, LuSettings2 } from 'react-icons/lu';
import GuildSettingsPanel from './components/GuildSettingsPanel';
import GuildUnavailable from './components/GuildUnavailable';
import useDiscordGuildInfoError from '@/hooks/queries/discord/useDiscordGuildInfoError';
import useFavoriteGuilds from '@/hooks/shared/useFavoriteGuilds';
import { isGuildAccessError } from '@/lib/guild-access';
import { IGuildDashboardViewProps } from './GuildDashboardView';

import styles from './styles.module.scss';

const SECTION_TABS: ISectionTabItem<GuildDashboardTab>[] = [
  { key: GuildDashboardTab.Notifications, label: GUILD_DASHBOARD_TAB_LABELS[GuildDashboardTab.Notifications], icon: LuBell },
  { key: GuildDashboardTab.Logs, label: GUILD_DASHBOARD_TAB_LABELS[GuildDashboardTab.Logs], icon: LuScrollText },
  { key: GuildDashboardTab.Settings, label: GUILD_DASHBOARD_TAB_LABELS[GuildDashboardTab.Settings], icon: LuSettings2 },
];

const renderDiscordAuthError = (error: unknown) => (isDiscordAuthError(error) ? <DiscordReconnectBlocker /> : undefined);

const GuildDashboardView = ({ guildId }: IGuildDashboardViewProps) => {
  const [activeTab, setActiveTab] = useState<GuildDashboardTab>(GuildDashboardTab.Notifications);
  const { favorites } = useFavoriteGuilds();
  const guildInfoError = useDiscordGuildInfoError(guildId);
  const favorite = favorites.find((item) => item.id === guildId);

  // A saved server that can't be opened anymore gets one explanatory screen instead of the hero and
  // tab errors. Other servers keep the regular error states (with retry for transient failures).
  if (favorite && isGuildAccessError(guildInfoError)) {
    return (
      <div className={styles.layout}>
        <GuildUnavailable favorite={favorite} />
      </div>
    );
  }

  return (
    <div className={styles.layout}>
      <AsyncBoundary
        loading={<GuildHeroSkeleton />}
        renderError={(error, retry) => renderDiscordAuthError(error)
          ?? <GuildHeroFallback guildId={guildId} error={error} onRetry={retry} />}
      >
        <GuildHero guildId={guildId} />
      </AsyncBoundary>

      <div className={styles.main}>
        <SectionTabs<GuildDashboardTab> items={SECTION_TABS} value={activeTab} onChange={setActiveTab} label="Server sections" />

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
