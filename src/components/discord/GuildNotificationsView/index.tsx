'use client';

import { useState } from 'react';
import useGuildNotificationsQuery from '@/hooks/queries/discord/useGuildNotificationsQuery';
import Loading from '@/components/ui/Loading';
import BotNotificationsList from './BotNotificationsList';
import WebhookNotificationsList from './WebhookNotificationsList';
import styles from './styles.module.scss';

type Tab = 'bot' | 'webhook';

interface IGuildNotificationsViewProps {
  guildId: string;
}

const GuildNotificationsView = ({ guildId }: IGuildNotificationsViewProps) => {
  const [activeTab, setActiveTab] = useState<Tab>('bot');
  const { data, isLoading } = useGuildNotificationsQuery(guildId);

  return (
    <div className={styles.root}>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'bot' ? styles.active : ''}`}
          onClick={() => setActiveTab('bot')}
        >
          Discord Bot
          {data && (
            <span className={styles.badge}>{data.bot.length}</span>
          )}
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'webhook' ? styles.active : ''}`}
          onClick={() => setActiveTab('webhook')}
        >
          Webhook
          {data && (
            <span className={styles.badge}>{data.webhook.length}</span>
          )}
        </button>
      </div>

      <div className={styles.content}>
        {isLoading ? (
          <div className={styles.center}><Loading /></div>
        ) : activeTab === 'bot' ? (
          <BotNotificationsList items={data?.bot ?? []} />
        ) : (
          <WebhookNotificationsList items={data?.webhook ?? []} />
        )}
      </div>
    </div>
  );
};

export default GuildNotificationsView;
