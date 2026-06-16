import { apiClient } from '@/lib/api-client';
import { IDailyStatsItem, INotificationSplitModel, IPlatformStatsModel, ITopStreamerItem, IUserStatsModel } from '@/lib/models/statistics/statistics.model';

const StatisticsService = {
  getPlatformStats: async (): Promise<IPlatformStatsModel> => {
    return await apiClient.get('/api/statistics/platform');
  },

  getDailyStats: async (): Promise<IDailyStatsItem[]> => {
    return await apiClient.get('/api/statistics/daily');
  },

  getMyStats: async (): Promise<IUserStatsModel> => {
    return await apiClient.get('/api/statistics/me');
  },

  getTopStreamers: async (): Promise<ITopStreamerItem[]> => {
    return await apiClient.get('/api/statistics/top-streamers');
  },

  getNotificationSplit: async (): Promise<INotificationSplitModel> => {
    return await apiClient.get('/api/statistics/notification-split');
  },
};

export default StatisticsService;
