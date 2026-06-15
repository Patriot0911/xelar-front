import { useQuery } from '@tanstack/react-query';
import StatisticsService from '@/lib/services/statistics.service';
import { IPlatformStatsModel } from '@/lib/models/statistics/statistics.model';
import { StatisticsQueryKey } from '@/lib/constants/statistics';

const usePlatformStatsQuery = () => {
  return useQuery<IPlatformStatsModel>({
    queryKey: [StatisticsQueryKey.Platform],
    queryFn: () => StatisticsService.getPlatformStats(),
  });
};

export default usePlatformStatsQuery;
