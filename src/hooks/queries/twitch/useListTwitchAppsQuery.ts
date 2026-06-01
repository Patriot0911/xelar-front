import { useQuery } from '@tanstack/react-query';
import TwitchAppService, { TwitchAppsQueryKey } from '@/lib/services/twitch-app.service';
import { TTwitchAppsListModel } from '@/lib/models/twitch/twitch-app.model';

export interface ITwitchAppsQueryParams {
  page?: number;
  pageSize?: number;
}

const useTwitchAppsQuery = (params?: ITwitchAppsQueryParams) => {
  return useQuery<TTwitchAppsListModel>({
    queryKey: [TwitchAppsQueryKey.List, params?.page, params?.pageSize],
    queryFn: () => TwitchAppService.getTwitchApps(params),
  });
};

export default useTwitchAppsQuery;
