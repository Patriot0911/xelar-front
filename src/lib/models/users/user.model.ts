import { IGenericList, IGenericPagination } from '@/lib/models/generic-response.model';
import type { IDiscordBotNotificationModel, IWebhookNotificationModel } from '@/lib/models/discord';

export type AccountStatus = 'active' | 'blocked';
export type NotificationLogType = 'discord' | 'webhook';
export type NotificationLogStatus = 'sent' | 'failed';

export interface IUserListItem {
  id: string;
  displayName: string;
  balance: number;
  status: AccountStatus;
  roles: string[];
  allowPersonalSubscriptions: boolean;
  createdAt: string;
}

export interface IUserItem extends IUserListItem {
  email: string | null;
  discordId: string | null;
  twitchLogin: string | null;
}

export interface IUsersListParams {
  page?: number;
  pageSize?: number;
  search?: string;
}

export interface IUsersListResponse {
  items: IUserListItem[];
  meta: { count: number };
}

export interface IUserSession {
  id: string;
  createdAt: string;
  expiresAt: string;
}

export interface IUserNotificationLog {
  id: string;
  notificationId: string;
  notificationType: NotificationLogType;
  status: NotificationLogStatus;
  streamerLogin: string;
  eventType: string;
  errorMessage: string | null;
  createdAt: string;
}

export interface IUserNotificationLogsParams extends IGenericPagination {}

export interface IUserNotificationLogsResponse extends IGenericList<IUserNotificationLog> {}

export interface IUserSubscriptionsParams extends IGenericPagination {}

export interface IUserBotSubscriptionsResponse extends IGenericList<IDiscordBotNotificationModel> {}

export interface IUserWebhookSubscriptionsResponse extends IGenericList<IWebhookNotificationModel> {}

export interface IUpdateUserRolesPayload {
  roleIds: string[];
}

export interface IUpdateUserStatusPayload {
  status: AccountStatus;
}

export interface IUpdateUserBalancePayload {
  balance: number;
}
