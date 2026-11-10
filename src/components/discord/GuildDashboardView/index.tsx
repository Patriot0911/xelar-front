'use client';

import { useState } from 'react';
import GuildInfoPanel from './GuildInfoPanel';
import AsyncBoundary from '@/components/common/AsyncBoundary';
import Loading from '@/components/ui/Loading';
import DiscordReconnectBlocker from '@/components/discord/DiscordReconnectBlocker';
import { isDiscordAuthError } from '@/lib/errors';
import GuildNotificationsView from '@/components/discord/GuildNotificationsView';
import GuildLogsSection from '@/components/discord/GuildManagementView/GuildLogsSection';
import { IGuildDashboardViewProps, TGuildDashboardTab } from './GuildDashboardView';

import styles from './styles.module.scss';

const GuildDashboardView = ({ guildId }: IGuildDashboardViewProps) => {
  const [activeTab, setActiveTab] = useState<TGuildDashboardTab>('notifications');

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <AsyncBoundary
          compact
          loading={<Loading type="block" tone="discord" title="Loading server" />}
          renderError={(error) => (isDiscordAuthError(error) ? <DiscordReconnectBlocker /> : undefined)}
        >
          <GuildInfoPanel guildId={guildId} />
        </AsyncBoundary>
      </aside>

      <div className={styles.main}>
        <div className={styles.tabsRow}>
          <button
            className={`${styles.tab} ${activeTab === 'notifications' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            Notifications
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'logs' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('logs')}
          >
            Logs
          </button>
        </div>

        <div className={styles.content}>
          {/* Keyed by tab so switching tabs also clears an error shown for the other one. */}
          <AsyncBoundary key={activeTab} compact loading={null}>
            {activeTab === 'notifications' ? (
              <GuildNotificationsView guildId={guildId} />
            ) : (
              <GuildLogsSection guildId={guildId} />
            )}
          </AsyncBoundary>
        </div>
      </div>
    </div>
  );
};

export default GuildDashboardView;
