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
