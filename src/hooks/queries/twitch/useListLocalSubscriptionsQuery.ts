import { useQuery } from '@tanstack/react-query';
import TwitchSubscriptionService, { TwitchSubscriptionQueryKey } from '@/lib/services/twitch-subscription.service';
import { TTwitchLocalSubscriptionsList } from '@/lib/models/twitch/twitch-subscription.model';

interface IParams {
  page?: number;
  pageSize?: number;
}

const useListLocalSubscriptionsQuery = (params?: IParams) => {
  return useQuery<TTwitchLocalSubscriptionsList>({
    queryKey: [TwitchSubscriptionQueryKey.LocalList, params?.page, params?.pageSize],
    queryFn: () => TwitchSubscriptionService.getLocalSubscriptions(params),
  });
};

export default useListLocalSubscriptionsQuery;
