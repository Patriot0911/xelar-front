import { apiClient } from '@/lib/api-client';
import { IGenericResponseModel } from '@/lib/models/generic-response.model';
import { ITwitchAppsListResponse } from '@/lib/models/twitch/twitch-app.model';

export const TwitchAppsQueryKey = {
  List: 'twitch-apps-list',
} as const;

const TwitchAppService = {
  getApps: async (params?: { page?: number; pageSize?: number }): Promise<ITwitchAppsListResponse> => {
    const res = await apiClient.get<never, IGenericResponseModel<ITwitchAppsListResponse>>(
      '/api/admin/twitch/apps',
      { params },
    );
    return res.data;
  },
};

export default TwitchAppService;
