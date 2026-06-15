import { apiClient } from '@/lib/api-client';
import { IDailyStatsItem, IPlatformStatsModel, IUserStatsModel } from '@/lib/models/statistics/statistics.model';

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
};

export default StatisticsService;
