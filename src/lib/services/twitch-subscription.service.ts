import { apiClient } from '@/lib/api-client';
import { IGenericPagination } from '@/lib/models/generic-response.model';
import {
  IDeleteTwitchSubscriptionPayload,
  IRawTwitchSubscriptionsResponse,
  TTwitchLocalSubscriptionsList,
} from '@/lib/models/twitch/twitch-subscription.model';

export enum TwitchSubscriptionQueryKey {
  LocalList = 'twitch-subscriptions-local-list',
  RawList   = 'twitch-subscriptions-raw-list',
}

class TwitchSubscriptionService {
  static getLocalSubscriptions(params?: IGenericPagination): Promise<TTwitchLocalSubscriptionsList> {
    return apiClient.get('/api/admin/twitch/events', { params });
  }

  static deleteLocalSubscription(id: string): Promise<void> {
    return apiClient.delete(`/api/admin/twitch/events/${id}`);
  }

  static getRawSubscriptions(clientId: string, after?: string): Promise<IRawTwitchSubscriptionsResponse> {
    return apiClient.get('/api/admin/twitch/subscriptions/raw', { params: { clientId, after } });
  }

  static deleteTwitchSubscription(payload: IDeleteTwitchSubscriptionPayload): Promise<void> {
    return apiClient.delete('/api/admin/twitch/subscriptions/raw', { data: payload });
  }
}

export default TwitchSubscriptionService;
