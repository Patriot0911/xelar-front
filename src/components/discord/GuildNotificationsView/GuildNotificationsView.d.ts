import { IDiscordBotNotificationModel, IWebhookNotificationModel } from '@/lib/models/discord';

export interface IGuildNotificationsViewProps {
  guildId: string;
};

export type TNotificationTarget =
  | { type: 'bot'; item: IDiscordBotNotificationModel }
  | { type: 'webhook'; item: IWebhookNotificationModel }
  | null;
