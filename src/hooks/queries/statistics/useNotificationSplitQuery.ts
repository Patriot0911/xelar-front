import { useQuery } from '@tanstack/react-query';
import StatisticsService from '@/lib/services/statistics.service';
import { INotificationSplitModel } from '@/lib/models/statistics/statistics.model';
import { StatisticsQueryKey } from '@/lib/constants/statistics';

const useNotificationSplitQuery = () => {
  return useQuery<INotificationSplitModel>({
    queryKey: [StatisticsQueryKey.NotificationSplit],
    queryFn: StatisticsService.getNotificationSplit,
  });
};

export default useNotificationSplitQuery;
