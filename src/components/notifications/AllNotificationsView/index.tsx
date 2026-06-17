'use client';

import { useState } from 'react';
import useAllNotificationsQuery from '@/hooks/queries/discord/useAllNotificationsQuery';
import useDeleteDiscordNotificationMutation from '@/hooks/mutations/discord/useDeleteDiscordNotificationMutation';
import useDeleteWebhookNotificationMutation from '@/hooks/mutations/discord/useDeleteWebhookNotificationMutation';
import Loading from '@/components/ui/Loading';
import EditNotificationModal from '@/components/discord/EditNotificationModal';
import ConfirmModal from '@/components/common/ConfirmModal';
import BotNotificationsList from '@/components/discord/GuildNotificationsView/BotNotificationsList';
import WebhookNotificationsList from '@/components/discord/GuildNotificationsView/WebhookNotificationsList';
import type { IDiscordBotNotificationModel, IWebhookNotificationModel } from '@/lib/models/discord';
import styles from './styles.module.scss';

type Tab = 'bot' | 'webhook';

type EditTarget =
  | { type: 'bot';     item: IDiscordBotNotificationModel }
  | { type: 'webhook'; item: IWebhookNotificationModel }
  | null;

type DeleteTarget =
  | { type: 'bot';     item: IDiscordBotNotificationModel }
  | { type: 'webhook'; item: IWebhookNotificationModel }
  | null;

const AllNotificationsView = () => {
  const [activeTab, setActiveTab]       = useState<Tab>('bot');
  const [editTarget, setEditTarget]     = useState<EditTarget>(null);
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget>(null);

  const { data, isLoading } = useAllNotificationsQuery();
  const deleteBot     = useDeleteDiscordNotificationMutation();
  const deleteWebhook = useDeleteWebhookNotificationMutation();

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    const mutation = deleteTarget.type === 'bot' ? deleteBot : deleteWebhook;
    mutation.mutate(deleteTarget.item.id, { onSuccess: () => setDeleteTarget(null) });
  };

  const isDeleting = deleteBot.isPending || deleteWebhook.isPending;

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
            items={data?.bot ?? []}
            onEdit={(item) => setEditTarget({ type: 'bot', item })}
            onDelete={(item) => setDeleteTarget({ type: 'bot', item })}
          />
        ) : (
          <WebhookNotificationsList
            items={data?.webhook ?? []}
            onEdit={(item) => setEditTarget({ type: 'webhook', item })}
            onDelete={(item) => setDeleteTarget({ type: 'webhook', item })}
          />
        )}
      </div>

      {editTarget && (
        <EditNotificationModal
          type={editTarget.type}
          notification={editTarget.item as any}
          guildId={editTarget.type === 'bot' ? (editTarget.item as any).guild.discordGuildId : ''}
          isOpen={!!editTarget}
          onClose={() => setEditTarget(null)}
        />
      )}

      <ConfirmModal
        title="Delete notification"
        description="Are you sure you want to delete this notification? This action cannot be undone."
        isOpen={!!deleteTarget}
        isLoading={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  );
};

export default AllNotificationsView;
