'use client';

import { useState } from 'react';
import { LuPlus } from 'react-icons/lu';
import useGuildNotificationsQuery from '@/hooks/queries/discord/useGuildNotificationsQuery';
import Loading from '@/components/ui/Loading';
import AddNotificationModal from '@/components/discord/AddNotificationModal';
import EditNotificationModal from '@/components/discord/EditNotificationModal';
import type { IDiscordBotNotificationModel, IWebhookNotificationModel } from '@/lib/models/discord';
import BotNotificationsList from './BotNotificationsList';
import WebhookNotificationsList from './WebhookNotificationsList';
import styles from './styles.module.scss';

type Tab = 'bot' | 'webhook';

type EditTarget =
  | { type: 'bot';     item: IDiscordBotNotificationModel }
  | { type: 'webhook'; item: IWebhookNotificationModel }
  | null;

interface IGuildNotificationsViewProps {
  guildId: string;
}

const GuildNotificationsView = ({ guildId }: IGuildNotificationsViewProps) => {
  const [activeTab,   setActiveTab]   = useState<Tab>('bot');
  const [modalOpen,   setModalOpen]   = useState(false);
  const [editTarget,  setEditTarget]  = useState<EditTarget>(null);
  const { data, isLoading } = useGuildNotificationsQuery(guildId);

  return (
    <div className={styles.root}>
      <div className={styles.tabsRow}>
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

        <button className={styles.addBtn} onClick={() => setModalOpen(true)}>
          <LuPlus size={14} />
          Add Notification
        </button>
      </div>

      <div className={styles.content}>
        {isLoading ? (
          <div className={styles.center}><Loading /></div>
        ) : activeTab === 'bot' ? (
          <BotNotificationsList
            items={data?.bot ?? []}
            onEdit={(item) => setEditTarget({ type: 'bot', item })}
          />
        ) : (
          <WebhookNotificationsList
            items={data?.webhook ?? []}
            onEdit={(item) => setEditTarget({ type: 'webhook', item })}
          />
        )}
      </div>

      <AddNotificationModal
        guildId={guildId}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />

      {editTarget && (
        <EditNotificationModal
          type={editTarget.type}
          notification={editTarget.item as any}
          guildId={guildId}
          isOpen={!!editTarget}
          onClose={() => setEditTarget(null)}
        />
      )}
    </div>
  );
};

export default GuildNotificationsView;
