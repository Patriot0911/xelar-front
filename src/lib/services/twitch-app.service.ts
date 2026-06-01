import { apiClient } from '@/lib/api-client';
import { ICreateTwitchAppModel, IEditTwitchAppModel, ITwitchAppShortModel, TTwitchAppsListModel } from '@/lib/models/twitch/twitch-app.model';
import { ITwitchChannelsResponse } from '@/lib/models/twitch/twitch-channel.model';
import { IGenericPagination } from '@/lib/models/generic-response.model';

export enum TwitchAppsQueryKey {
  List = 'twitch-apps-list',
  Selected = 'twitch-selected-app',
};

class TwitchAppService {
  static createTwitchApp(data: ICreateTwitchAppModel): Promise<ITwitchAppShortModel> {
    return apiClient.post('/api/twitch/apps', data);
  }

  static editTwitchApp({ appId, ...data }: IEditTwitchAppModel): Promise<ITwitchAppShortModel> {
    return apiClient.patch(`/api/twitch/apps/${appId}`, data);
  }

  static deleteTwitchApp(appId: string): Promise<void> {
    return apiClient.delete(`/api/twitch/apps/${appId}`);
  }

  static getTwitchApps(params?: IGenericPagination): Promise<TTwitchAppsListModel> {
    return apiClient.get(`/api/twitch/apps`, { params });
  }

  static getTwitchApp(appId: string): Promise<ITwitchAppShortModel> {
    return apiClient.get(`/api/twitch/apps/${appId}`);
  }

  static searchChannels(search: string, signal?: AbortSignal): Promise<ITwitchChannelsResponse> {
    return apiClient.get('/api/twitch/channels', { params: { search }, signal });
  }
}

export default TwitchAppService;
