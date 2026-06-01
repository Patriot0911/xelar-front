import { useQuery } from '@tanstack/react-query';
import TwitchSubscriptionService, { TwitchSubscriptionQueryKey } from '@/lib/services/twitch-subscription.service';
import { IRawTwitchSubscriptionsResponse } from '@/lib/models/twitch/twitch-subscription.model';

interface IParams {
  clientId: string;
  after?: string;
}

const useRawSubscriptionsQuery = (params: IParams) => {
  return useQuery<IRawTwitchSubscriptionsResponse>({
    queryKey: [TwitchSubscriptionQueryKey.RawList, params.clientId, params.after],
    queryFn: () => TwitchSubscriptionService.getRawSubscriptions(params.clientId, params.after),
    enabled: !!params.clientId,
  });
};

export default useRawSubscriptionsQuery;
