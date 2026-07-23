export type NotificationLogType = 'discord' | 'webhook';
export type NotificationLogStatus = 'sent' | 'failed';

export interface IStreamerListItem {
  id: string;
  broadcasterId: string;
  twitchLogin: string;
  displayName: string;
  profileImageUrl: string | null;
  isPartner: boolean;
  isInternal: boolean;
  allowPersonalSubscriptions: boolean;
  linkedUserId: string | null;
  createdAt: string;
}

export interface IStreamerItem extends IStreamerListItem {
  linkedUserDisplayName: string | null;
  linkedUserEmail: string | null;
}

export interface IStreamersListParams {
  page?: number;
  pageSize?: number;
  search?: string;
}

export interface IStreamersListResponse {
  items: IStreamerListItem[];
  meta: { count: number };
}

export interface IUpdateStreamerPayload {
  isInternal?: boolean;
}

export interface IStreamerNotificationLog {
  id: string;
  notificationId: string;
  notificationType: NotificationLogType;
  status: NotificationLogStatus;
  eventType: string;
  errorMessage: string | null;
  createdAt: string;
}
