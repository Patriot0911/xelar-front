import { apiClient } from '@/lib/api-client';
import { ICreateTwitchAppModel, IEditTwitchAppModel, TTwitchAppsListModel } from '@/lib/models/twitch/twitch-app.model';

export enum TwitchAppsQueryKey {
  List = 'twitch-apps-list',
};

class TwitchAppService {
  static createTwitchApp(data: ICreateTwitchAppModel) {
    return apiClient.post('/api/twitch/apps', data);
  }

  static editTwitchApp({ appId, ...data }: IEditTwitchAppModel) {
    return apiClient.patch(`/api/twitch/apps/${appId}`, data);
  }

  static deleteTwitchApp(appId: string) {
    return apiClient.delete(`/api/twitch/apps/${appId}`);
  }

  static getTwitchApps(): Promise<TTwitchAppsListModel> {
    return apiClient.get(`/api/twitch/apps`);
  }

  static getTwitchApp(appId: string) {
    return apiClient.get(`/api/twitch/apps/${appId}`);
  }
}

export default TwitchAppService;
