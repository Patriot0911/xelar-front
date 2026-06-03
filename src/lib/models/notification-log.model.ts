export type NotificationLogType   = 'discord' | 'webhook';
export type NotificationLogStatus = 'sent' | 'failed';

export interface INotificationLogModel {
  id: string;
  notificationId: string;
  notificationType: NotificationLogType;
  status: NotificationLogStatus;
  ownerId: string;
  guildId: string | null;
  streamerLogin: string;
  eventType: string;
  requestPayload: Record<string, unknown> | null;
  errorMessage: string | null;
  createdAt: string;
}

export interface INotificationLogsResponse {
  items: INotificationLogModel[];
  meta: { count: number };
}
