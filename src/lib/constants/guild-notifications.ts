export enum GuildNotificationType {
  Bot = 'bot',
  Webhook = 'webhook',
}

export const GUILD_NOTIFICATION_TYPE_LABELS: Record<GuildNotificationType, string> = {
  [GuildNotificationType.Bot]: 'Bot messages',
  [GuildNotificationType.Webhook]: 'Webhooks',
};

export const GUILD_NOTIFICATIONS_PAGE_SIZE = 10;

/** `useTableColumns` storage scope of a guild's notification table — column choice is kept per server and per table. */
export const getGuildNotificationsColumnsKey = (guildId: string, type: GuildNotificationType) =>
  `guild:${guildId}:${type}-notifications`;
