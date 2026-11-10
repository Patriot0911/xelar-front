import { useQuery } from '@tanstack/react-query';
import TwitchAppService from '@/lib/services/twitch-app.service';

const useAllowPersonalSubscriptionsQuery = (broadcasterId: string) => {
  return useQuery<{ allowed: boolean }>({
    // Auxiliary data: a failure must not replace the page, so it is reported as a toast.
    meta: { errorMode: 'toast' },
    queryKey: ['twitch-allow-personal-subscriptions', broadcasterId],
    queryFn: () => TwitchAppService.getAllowPersonalSubscriptions(broadcasterId),
    enabled: !!broadcasterId,
    staleTime: 60_000,
  });
};

export default useAllowPersonalSubscriptionsQuery;
