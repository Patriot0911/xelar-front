import { apiClient } from '@/lib/api-client';
import { expectArray, expectList, expectObject } from '@/lib/errors';
import {
  IStreamerItem,
  IStreamerNotificationLog,
  IStreamersListParams,
  IStreamersListResponse,
  IUpdateStreamerPayload,
} from '@/lib/models/streamers/streamer.model';

const StreamersService = {
  getStreamers: async (params?: IStreamersListParams): Promise<IStreamersListResponse> => {
    return apiClient.get('/api/streamers', { params }).then(expectList<IStreamersListResponse>('/api/streamers'));
  },

  getStreamerById: async (id: string): Promise<IStreamerItem> => {
    return apiClient.get(`/api/streamers/${id}`).then(expectObject<IStreamerItem>(`/api/streamers/${id}`));
  },

  updateStreamer: async (id: string, payload: IUpdateStreamerPayload): Promise<IStreamerItem> => {
    return apiClient.patch(`/api/streamers/${id}`, payload);
  },

  syncStreamer: async (id: string): Promise<IStreamerItem> => {
    return apiClient.post(`/api/streamers/${id}/sync`);
  },

  getStreamerNotificationLogs: async (id: string): Promise<IStreamerNotificationLog[]> => {
    return apiClient.get(`/api/streamers/${id}/notification-logs`).then(expectArray<IStreamerNotificationLog[]>(`/api/streamers/${id}/notification-logs`));
  },
};

export default StreamersService;
