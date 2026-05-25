import { useQuery } from '@tanstack/react-query';
import TwitchAppService, { TwitchAppsQueryKey } from '@/lib/services/twitch-app.service';
import { TTwitchAppsListModel } from '@/lib/models/twitch/twitch-app.model';

const useTwitchAppsQuery = () => {
  return useQuery<TTwitchAppsListModel>({
    queryKey: [TwitchAppsQueryKey.List],
    queryFn: TwitchAppService.getTwitchApps,
  });
};

export default useTwitchAppsQuery;
