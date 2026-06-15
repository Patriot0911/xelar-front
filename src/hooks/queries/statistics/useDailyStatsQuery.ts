import { useQuery } from '@tanstack/react-query';
import StatisticsService from '@/lib/services/statistics.service';
import { IDailyStatsItem } from '@/lib/models/statistics/statistics.model';
import { StatisticsQueryKey } from '@/lib/constants/statistics';

const useDailyStatsQuery = () => {
  return useQuery<IDailyStatsItem[]>({
    queryKey: [StatisticsQueryKey.Daily],
    queryFn: () => StatisticsService.getDailyStats(),
  });
};

export default useDailyStatsQuery;
