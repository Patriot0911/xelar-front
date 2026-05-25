import { useQuery } from '@tanstack/react-query';
import TwitchAppService, { TwitchAppsQueryKey } from '@/lib/services/twitch-app.service';
import { ITwitchAppShortModel } from '@/lib/models/twitch/twitch-app.model';

const useGetTwitchAppQuery = (appId: string = '', enabled: boolean) => {
  return useQuery<ITwitchAppShortModel>({
    queryKey: [TwitchAppsQueryKey.Selected],
    enabled,
    queryFn: () => TwitchAppService.getTwitchApp(appId!),
  });
};

export default useGetTwitchAppQuery;
