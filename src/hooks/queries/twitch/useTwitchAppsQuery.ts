import { useQuery } from '@tanstack/react-query';
import TwitchAppService, { TwitchAppsQueryKey } from '@/lib/services/twitch-app.service';
import { ITwitchAppsListResponse } from '@/lib/models/twitch/twitch-app.model';

const useTwitchAppsQuery = () => {
  return useQuery<ITwitchAppsListResponse>({
    queryKey: [TwitchAppsQueryKey.List],
    queryFn: () => TwitchAppService.getApps(),
  });
};

export default useTwitchAppsQuery;
