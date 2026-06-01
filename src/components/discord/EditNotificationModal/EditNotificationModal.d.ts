import type { IDiscordBotNotificationModel, IWebhookNotificationModel } from '@/lib/models/discord';

export interface IEditBotModalProps {
  type: 'bot';
  notification: IDiscordBotNotificationModel;
  guildId: string;
  isOpen: boolean;
  onClose: () => void;
}

export interface IEditWebhookModalProps {
  type: 'webhook';
  notification: IWebhookNotificationModel;
  guildId: string;
  isOpen: boolean;
  onClose: () => void;
}

export type IEditNotificationModalProps = IEditBotModalProps | IEditWebhookModalProps;
