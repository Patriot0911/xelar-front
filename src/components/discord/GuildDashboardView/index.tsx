'use client';

import { useState } from 'react';
import GuildInfoPanel from './GuildInfoPanel';
import GuildNotificationsView from '@/components/discord/GuildNotificationsView';
import GuildLogsSection from '@/components/discord/GuildManagementView/GuildLogsSection';
import { IGuildDashboardViewProps, TGuildDashboardTab } from './GuildDashboardView';

import styles from './styles.module.scss';

const GuildDashboardView = ({ guildId }: IGuildDashboardViewProps) => {
  const [activeTab, setActiveTab] = useState<TGuildDashboardTab>('notifications');

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <GuildInfoPanel guildId={guildId} />
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
          {activeTab === 'notifications' ? (
            <GuildNotificationsView guildId={guildId} />
          ) : (
            <GuildLogsSection guildId={guildId} />
          )}
        </div>
      </div>
    </div>
  );
};

export default GuildDashboardView;
