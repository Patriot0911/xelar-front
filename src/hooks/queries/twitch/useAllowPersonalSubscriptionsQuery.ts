import { useQuery } from '@tanstack/react-query';
import TwitchAppService from '@/lib/services/twitch-app.service';

const useAllowPersonalSubscriptionsQuery = (broadcasterId: string) => {
  return useQuery<{ allowed: boolean }>({
    queryKey: ['twitch-allow-personal-subscriptions', broadcasterId],
    queryFn: () => TwitchAppService.getAllowPersonalSubscriptions(broadcasterId),
    enabled: !!broadcasterId,
    staleTime: 60_000,
  });
};

export default useAllowPersonalSubscriptionsQuery;
