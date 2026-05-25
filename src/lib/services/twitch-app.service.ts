import { apiClient } from '@/lib/api-client';
import { ICreateTwitchAppModel, IEditTwitchAppModel, ITwitchAppShortModel, TTwitchAppsListModel } from '@/lib/models/twitch/twitch-app.model';

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

  static deleteTwitchApp(appId: string) {
    return apiClient.delete(`/api/twitch/apps/${appId}`);
  }

  static getTwitchApps(): Promise<TTwitchAppsListModel> {
    return apiClient.get(`/api/twitch/apps`);
  }

  static getTwitchApp(appId: string): Promise<ITwitchAppShortModel> {
    return apiClient.get(`/api/twitch/apps/${appId}`);
  }
}

export default TwitchAppService;
