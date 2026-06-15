import { useQuery } from '@tanstack/react-query';
import StatisticsService from '@/lib/services/statistics.service';
import { IUserStatsModel } from '@/lib/models/statistics/statistics.model';
import { StatisticsQueryKey } from '@/lib/constants/statistics';

const useMyStatsQuery = () => {
  return useQuery<IUserStatsModel>({
    queryKey: [StatisticsQueryKey.Me],
    queryFn: () => StatisticsService.getMyStats(),
  });
};

export default useMyStatsQuery;
