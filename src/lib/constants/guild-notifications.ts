export enum GuildNotificationType {
  Bot = 'bot',
  Webhook = 'webhook',
}

export const GUILD_NOTIFICATION_TYPE_LABELS: Record<GuildNotificationType, string> = {
  [GuildNotificationType.Bot]: 'Bot messages',
  [GuildNotificationType.Webhook]: 'Webhooks',
};

export const GUILD_NOTIFICATIONS_PAGE_SIZE = 10;
