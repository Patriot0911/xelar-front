'use client';

import { useState } from 'react';
import useAllNotificationsQuery from '@/hooks/queries/discord/useAllNotificationsQuery';
import useDeleteDiscordNotificationMutation from '@/hooks/mutations/discord/useDeleteDiscordNotificationMutation';
import useDeleteWebhookNotificationMutation from '@/hooks/mutations/discord/useDeleteWebhookNotificationMutation';
import Loading from '@/components/ui/Loading';
import BotNotificationsList from '@/components/discord/GuildNotificationsView/BotNotificationsList';
import WebhookNotificationsList from '@/components/discord/GuildNotificationsView/WebhookNotificationsList';
import styles from './styles.module.scss';

type Tab = 'bot' | 'webhook';

const AllNotificationsView = () => {
  const [activeTab, setActiveTab] = useState<Tab>('bot');
  const { data, isLoading } = useAllNotificationsQuery();
  const deleteDiscord = useDeleteDiscordNotificationMutation();
  const deleteWebhook = useDeleteWebhookNotificationMutation();

  return (
    <div className={styles.root}>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'bot' ? styles.active : ''}`}
          onClick={() => setActiveTab('bot')}
        >
          Discord Bot
          {data && <span className={styles.badge}>{data.bot.length}</span>}
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'webhook' ? styles.active : ''}`}
          onClick={() => setActiveTab('webhook')}
        >
          Webhook
          {data && <span className={styles.badge}>{data.webhook.length}</span>}
        </button>
      </div>

      <div className={styles.content}>
        {isLoading ? (
          <div className={styles.center}><Loading /></div>
        ) : activeTab === 'bot' ? (
          <BotNotificationsList
            onEdit={() => {}}
            onDelete={(item) => deleteDiscord.mutate(item.id)}
            items={data?.bot ?? []}
          />
        ) : (
          <WebhookNotificationsList
            onEdit={() => {}}
            onDelete={(item) => deleteWebhook.mutate(item.id)}
            items={data?.webhook ?? []}
          />
        )}
      </div>
    </div>
  );
};

export default AllNotificationsView;
