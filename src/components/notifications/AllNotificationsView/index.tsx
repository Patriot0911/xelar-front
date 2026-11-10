'use client';

import { useState } from 'react';
import useMyBotNotificationsQuery from '@/hooks/queries/discord/useMyBotNotificationsQuery';
import useMyWebhookNotificationsQuery from '@/hooks/queries/discord/useMyWebhookNotificationsQuery';
import useDeleteDiscordNotificationMutation from '@/hooks/mutations/discord/useDeleteDiscordNotificationMutation';
import useDeleteWebhookNotificationMutation from '@/hooks/mutations/discord/useDeleteWebhookNotificationMutation';
import useClampPage from '@/hooks/shared/useClampPage';
import useListSearch from '@/hooks/shared/useListSearch';
import Tabs from '@/components/ui/Tabs';
import { TabItem } from '@/components/ui/Tabs/Tabs';
import SearchInput from '@/components/ui/SearchInput';
import EditNotificationModal from '@/components/discord/EditNotificationModal';
import ConfirmModal from '@/components/common/ConfirmModal';
import BotNotificationsTable from '@/components/discord/BotNotificationsTable';
import WebhookNotificationsTable from '@/components/discord/WebhookNotificationsTable';
import { GUILD_NOTIFICATION_TYPE_LABELS, GuildNotificationType } from '@/lib/constants/guild-notifications';
import type { TGuildNotificationRef } from '@/lib/models/discord';

import styles from './styles.module.scss';

/** Every notification the current user created, across servers: search, bot / webhook tabs, pagination. */
const AllNotificationsView = () => {
  const [activeType, setActiveType] = useState<GuildNotificationType>(GuildNotificationType.Bot);
  const [botPage, setBotPage] = useState(1);
  const [webhookPage, setWebhookPage] = useState(1);
  const [editTarget, setEditTarget] = useState<TGuildNotificationRef | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<TGuildNotificationRef | null>(null);

  // One search for both tabs; a new term starts both lists from page 1.
  const { value, setValue, search } = useListSearch(() => {
    setBotPage(1);
    setWebhookPage(1);
  });

  const botQuery = useMyBotNotificationsQuery(botPage, search);
  const webhookQuery = useMyWebhookNotificationsQuery(webhookPage, search);
  const deleteBot = useDeleteDiscordNotificationMutation();
  const deleteWebhook = useDeleteWebhookNotificationMutation();

  useClampPage(botPage, setBotPage, botQuery.data?.items.length);
  useClampPage(webhookPage, setWebhookPage, webhookQuery.data?.items.length);

  const activeQuery = activeType === GuildNotificationType.Bot ? botQuery : webhookQuery;
  const emptyText = search ? `Nothing matches “${search}”` : undefined;

  const tabs: TabItem<GuildNotificationType>[] = [
    { key: GuildNotificationType.Bot, label: GUILD_NOTIFICATION_TYPE_LABELS[GuildNotificationType.Bot], count: botQuery.data?.meta.count },
    { key: GuildNotificationType.Webhook, label: GUILD_NOTIFICATION_TYPE_LABELS[GuildNotificationType.Webhook], count: webhookQuery.data?.meta.count },
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
        <SearchInput
          value={value}
          onChange={setValue}
          placeholder="Search by streamer or event"
          label="Search notifications"
          isSearching={activeQuery.isFetching && !activeQuery.isLoading}
        />
      </div>

      <div role="tabpanel" aria-label={GUILD_NOTIFICATION_TYPE_LABELS[activeType]}>
        {activeType === GuildNotificationType.Bot ? (
          <BotNotificationsTable
            data={botQuery.data}
            isLoading={botQuery.isLoading}
            page={botPage}
            onPageChange={setBotPage}
            emptyText={emptyText}
            onEdit={(item) => setEditTarget({ type: 'bot', item })}
            onDelete={(item) => setDeleteTarget({ type: 'bot', item })}
          />
        ) : (
          <WebhookNotificationsTable
            data={webhookQuery.data}
            isLoading={webhookQuery.isLoading}
            page={webhookPage}
            onPageChange={setWebhookPage}
            emptyText={emptyText}
            onEdit={(item) => setEditTarget({ type: 'webhook', item })}
            onDelete={(item) => setDeleteTarget({ type: 'webhook', item })}
          />
        )}
      </div>

      {editTarget && (
        <EditNotificationModal
          {...(editTarget.type === 'bot'
            ? { type: 'bot' as const, notification: editTarget.item }
            : { type: 'webhook' as const, notification: editTarget.item })}
          guildId={editTarget.item.guild?.discordGuildId ?? ''}
          isOpen
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

export default AllNotificationsView;
