'use client';

import { useState } from 'react';
import useUserBotSubscriptionsQuery from '@/hooks/queries/users/useUserBotSubscriptionsQuery';
import useUserWebhookSubscriptionsQuery from '@/hooks/queries/users/useUserWebhookSubscriptionsQuery';
import Tabs from '@/components/ui/Tabs';
import { TabItem } from '@/components/ui/Tabs/Tabs';
import { GUILD_NOTIFICATION_TYPE_LABELS, GuildNotificationType } from '@/lib/constants/guild-notifications';
import UserSubscriptionsTable from '../UserSubscriptionsTable';
import { IUserSubscriptionsTabProps } from './UserSubscriptionsTab';

import styles from './styles.module.scss';

/** Notifications the user created, split by delivery type — the same layout as a server's notifications. */
const UserSubscriptionsTab = ({ userId }: IUserSubscriptionsTabProps) => {
  const [type, setType] = useState<GuildNotificationType>(GuildNotificationType.Bot);
  const [botPage, setBotPage] = useState(1);
  const [webhookPage, setWebhookPage] = useState(1);

  // Both run so each sub-tab shows its total before it is opened.
  const botQuery = useUserBotSubscriptionsQuery(userId, botPage);
  const webhookQuery = useUserWebhookSubscriptionsQuery(userId, webhookPage);

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

  return (
    <div className={styles.root}>
      <div className={styles.toolbar}>
        <Tabs<GuildNotificationType> items={tabs} value={type} onChange={setType} />
      </div>

      {type === GuildNotificationType.Bot ? (
        <UserSubscriptionsTable
          type="bot"
          data={botQuery.data}
          isLoading={botQuery.isLoading}
          page={botPage}
          onPageChange={setBotPage}
        />
      ) : (
        <UserSubscriptionsTable
          type="webhook"
          data={webhookQuery.data}
          isLoading={webhookQuery.isLoading}
          page={webhookPage}
          onPageChange={setWebhookPage}
        />
      )}
    </div>
  );
};

export default UserSubscriptionsTab;
