import { AccountStatus } from '@/lib/models/users/user.model';

export const UsersQueryKey = {
  List: 'users-list',
  Detail: 'users-detail',
  Sessions: 'users-sessions',
  NotificationLogs: 'users-notification-logs',
  Subscriptions: 'users-subscriptions',
} as const;

export const USERS_DEFAULT_PAGE_SIZE = 20;

export const USER_LOGS_PAGE_SIZE = 10;

export const ACCOUNT_STATUS_LABELS: Record<AccountStatus, string> = {
  active: 'Active',
  blocked: 'Blocked',
};

export enum UserActivityTab {
  Logs = 'logs',
  Subscriptions = 'subscriptions',
  Sessions = 'sessions',
}

export const USER_ACTIVITY_TAB_LABELS: Record<UserActivityTab, string> = {
  [UserActivityTab.Logs]: 'Notification logs',
  [UserActivityTab.Subscriptions]: 'Subscriptions',
  [UserActivityTab.Sessions]: 'Active sessions',
};

export const USER_SUBSCRIPTIONS_PAGE_SIZE = 10;

export const USER_BALANCE_MAX = 999.9;
