export type AccountStatus = 'active' | 'blocked';
export type NotificationCostType = 'personal' | 'credit' | 'guild';
export type NotificationStatus = 'active' | 'suspended';
export type WebhookType = 'discord';
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

export interface IDiscordNotificationItem {
  id: string;
  status: NotificationStatus;
  costType: NotificationCostType;
  cost: number;
  channelId: string;
  discordGuildId: string;
  streamerEventId: string;
  createdAt: string;
}

export interface IWebhookNotificationItem {
  id: string;
  status: NotificationStatus;
  costType: NotificationCostType;
  cost: number;
  type: WebhookType;
  discordGuildId: string | null;
  streamerEventId: string;
  createdAt: string;
}

export interface IUserSubscriptions {
  discord: IDiscordNotificationItem[];
  webhook: IWebhookNotificationItem[];
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

export interface IUpdateUserRolesPayload {
  roleIds: string[];
}

export interface IUpdateUserStatusPayload {
  status: AccountStatus;
}

export interface IUpdateUserBalancePayload {
  balance: number;
}
