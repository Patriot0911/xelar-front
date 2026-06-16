export interface IPlatformStatsModel {
  totalNotifications: number;
  totalStreamers: number;
  totalUsers: number;
  totalGuilds: number;
  successfulNotifications: number;
}

export interface IDailyStatsItem {
  date: string;
  total: number;
  successful: number;
}

export interface IUserStatsModel {
  notificationsSent: number;
  usedCredits: number;
}

export interface ITopStreamerItem {
  twitchLogin: string;
  displayName: string | null;
  profileImageUrl: string | null;
  notificationCount: number;
}

export interface INotificationSplitModel {
  discord: number;
  webhook: number;
}
