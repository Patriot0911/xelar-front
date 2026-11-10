'use client';

import { useEffect, useState } from 'react';
import { LuPlus } from 'react-icons/lu';
import useGuildBotNotificationsQuery from '@/hooks/queries/discord/useGuildBotNotificationsQuery';
import useGuildWebhookNotificationsQuery from '@/hooks/queries/discord/useGuildWebhookNotificationsQuery';
import useDeleteDiscordNotificationMutation from '@/hooks/mutations/discord/useDeleteDiscordNotificationMutation';
import useDeleteWebhookNotificationMutation from '@/hooks/mutations/discord/useDeleteWebhookNotificationMutation';
import Tabs from '@/components/ui/Tabs';
import { TabItem } from '@/components/ui/Tabs/Tabs';
import AddNotificationModal from '@/components/discord/AddNotificationModal';
import EditNotificationModal from '@/components/discord/EditNotificationModal';
import ConfirmModal from '@/components/common/ConfirmModal';
import { GUILD_NOTIFICATION_TYPE_LABELS, GuildNotificationType } from '@/lib/constants/guild-notifications';
import BotNotificationsTable from '@/components/discord/BotNotificationsTable';
import WebhookNotificationsTable from '@/components/discord/WebhookNotificationsTable';
import { IGuildNotificationsViewProps, TNotificationTarget } from './GuildNotificationsView';

import styles from './styles.module.scss';

/** Steps back a page when the current one becomes empty (e.g. its last item was deleted). */
const useClampPage = (page: number, setPage: (page: number) => void, itemsOnPage?: number) => {
  useEffect(() => {
    if (page > 1 && itemsOnPage === 0) setPage(page - 1);
  }, [page, setPage, itemsOnPage]);
};

const GuildNotificationsView = ({ guildId }: IGuildNotificationsViewProps) => {
  const [activeType, setActiveType] = useState<GuildNotificationType>(GuildNotificationType.Bot);
  const [botPage, setBotPage] = useState(1);
  const [webhookPage, setWebhookPage] = useState(1);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<TNotificationTarget>(null);
  const [deleteTarget, setDeleteTarget] = useState<TNotificationTarget>(null);

  // Both run so each tab shows its total before it is opened.
  const botQuery = useGuildBotNotificationsQuery(guildId, botPage);
  const webhookQuery = useGuildWebhookNotificationsQuery(guildId, webhookPage);
  const deleteBot = useDeleteDiscordNotificationMutation();
  const deleteWebhook = useDeleteWebhookNotificationMutation();

  useClampPage(botPage, setBotPage, botQuery.data?.items.length);
  useClampPage(webhookPage, setWebhookPage, webhookQuery.data?.items.length);

  const tabs: TabItem<GuildNotificationType>[] = [
    {
      key: GuildNotificationType.Bot,
      label: GUILD_NOTIFICATION_TYPE_LABELS[GuildNotificationType.Bot],
      count: botQuery.data?.meta.count,
    },
    {
      key: GuildNotificationType.Webhook,
      label: GUILD_NOTIFICATION_TYPE_LABELS[GuildNotificationType.Webhook],
      count: webhookQuery.data?.meta.count,
    },
  ];

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    const mutation = deleteTarget.type === 'bot' ? deleteBot : deleteWebhook;
    mutation.mutate(deleteTarget.item.id, { onSuccess: () => setDeleteTarget(null) });
  };

  return (
    <div className={styles.root}>
      <div className={styles.toolbar}>
        <Tabs<GuildNotificationType> items={tabs} value={activeType} onChange={setActiveType} />
        <button type="button" className={styles.addBtn} onClick={() => setIsAddOpen(true)}>
          <LuPlus size={14} />
          Add notification
        </button>
      </div>

      <div role="tabpanel" aria-label={GUILD_NOTIFICATION_TYPE_LABELS[activeType]}>
        {activeType === GuildNotificationType.Bot ? (
          <BotNotificationsTable
            guildId={guildId}
            data={botQuery.data}
            isLoading={botQuery.isLoading}
            page={botPage}
            onPageChange={setBotPage}
            onEdit={(item) => setEditTarget({ type: 'bot', item })}
            onDelete={(item) => setDeleteTarget({ type: 'bot', item })}
          />
        ) : (
          <WebhookNotificationsTable
            data={webhookQuery.data}
            isLoading={webhookQuery.isLoading}
            page={webhookPage}
            onPageChange={setWebhookPage}
            onEdit={(item) => setEditTarget({ type: 'webhook', item })}
            onDelete={(item) => setDeleteTarget({ type: 'webhook', item })}
          />
        )}
      </div>

      <AddNotificationModal
        guildId={guildId}
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
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

      <ConfirmModal
        title="Delete notification"
        description="Are you sure you want to delete this notification? This action cannot be undone."
        isOpen={!!deleteTarget}
        isLoading={deleteBot.isPending || deleteWebhook.isPending}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  );
};

export default GuildNotificationsView;
