import { apiClient } from '@/lib/api-client';
import { expectArray, expectList, expectObject } from '@/lib/errors';
import { ICreateTwitchAppModel, IEditTwitchAppModel, ITwitchAppShortModel, TTwitchAppsListModel } from '@/lib/models/twitch/twitch-app.model';
import { ITwitchChannelsResponse } from '@/lib/models/twitch/twitch-channel.model';
import { ITwitchCategoriesResponse, ITwitchCategoryModel } from '@/lib/models/twitch/twitch-category.model';
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
    return apiClient.get(`/api/twitch/apps`, { params }).then(expectList<TTwitchAppsListModel>(`/api/twitch/apps`));
  }

  static getTwitchApp(appId: string): Promise<ITwitchAppShortModel> {
    return apiClient.get(`/api/twitch/apps/${appId}`).then(expectObject<ITwitchAppShortModel>(`/api/twitch/apps/${appId}`));
  }

  static searchChannels(search: string, signal?: AbortSignal): Promise<ITwitchChannelsResponse> {
    return apiClient.get('/api/twitch/channels', { params: { search }, signal }).then(expectObject<ITwitchChannelsResponse>('/api/twitch/channels'));
  }

  static searchCategories(search: string, signal?: AbortSignal): Promise<ITwitchCategoriesResponse> {
    return apiClient.get('/api/twitch/categories', { params: { search }, signal }).then(expectObject<ITwitchCategoriesResponse>('/api/twitch/categories'));
  }

  static getGamesByIds(ids: string[]): Promise<ITwitchCategoryModel[]> {
    return apiClient.get('/api/twitch/games', { params: { ids: ids.join(',') } }).then(expectArray<ITwitchCategoryModel[]>('/api/twitch/games'));
  }

  static getAllowPersonalSubscriptions(broadcasterId: string): Promise<{ allowed: boolean }> {
    return apiClient.get(`/api/twitch/${broadcasterId}/allow-personal-subscriptions`).then(expectObject<{ allowed: boolean }>(`/api/twitch/${broadcasterId}/allow-personal-subscriptions`));
  }
}

export default TwitchAppService;
