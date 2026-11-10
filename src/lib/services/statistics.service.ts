import { apiClient } from '@/lib/api-client';
import { expectArray, expectObject } from '@/lib/errors';
import { IDailyStatsItem, INotificationSplitModel, IPlatformStatsModel, ITopStreamerItem, IUserStatsModel } from '@/lib/models/statistics/statistics.model';

const StatisticsService = {
  getPlatformStats: async (): Promise<IPlatformStatsModel> => {
    return apiClient.get('/api/statistics/platform').then(expectObject<IPlatformStatsModel>('/api/statistics/platform'));
  },

  getDailyStats: async (): Promise<IDailyStatsItem[]> => {
    return apiClient.get('/api/statistics/daily').then(expectArray<IDailyStatsItem[]>('/api/statistics/daily'));
  },

  getMyStats: async (): Promise<IUserStatsModel> => {
    return apiClient.get('/api/statistics/me').then(expectObject<IUserStatsModel>('/api/statistics/me'));
  },

  getTopStreamers: async (): Promise<ITopStreamerItem[]> => {
    return apiClient.get('/api/statistics/top-streamers').then(expectArray<ITopStreamerItem[]>('/api/statistics/top-streamers'));
  },

  getNotificationSplit: async (): Promise<INotificationSplitModel> => {
    return apiClient.get('/api/statistics/notification-split').then(expectObject<INotificationSplitModel>('/api/statistics/notification-split'));
  },
};

export default StatisticsService;
