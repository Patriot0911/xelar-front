import { useQuery } from '@tanstack/react-query';
import StatisticsService from '@/lib/services/statistics.service';
import { ITopStreamerItem } from '@/lib/models/statistics/statistics.model';
import { StatisticsQueryKey } from '@/lib/constants/statistics';

const useTopStreamersQuery = () => {
  return useQuery<ITopStreamerItem[]>({
    queryKey: [StatisticsQueryKey.TopStreamers],
    queryFn: StatisticsService.getTopStreamers,
  });
};

export default useTopStreamersQuery;
