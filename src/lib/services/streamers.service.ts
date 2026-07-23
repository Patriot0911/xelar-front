import { apiClient } from '@/lib/api-client';
import {
  IStreamerItem,
  IStreamerNotificationLog,
  IStreamersListParams,
  IStreamersListResponse,
  IUpdateStreamerPayload,
} from '@/lib/models/streamers/streamer.model';

const StreamersService = {
  getStreamers: async (params?: IStreamersListParams): Promise<IStreamersListResponse> => {
    return apiClient.get('/api/streamers', { params });
  },

  getStreamerById: async (id: string): Promise<IStreamerItem> => {
    return apiClient.get(`/api/streamers/${id}`);
  },

  updateStreamer: async (id: string, payload: IUpdateStreamerPayload): Promise<IStreamerItem> => {
    return apiClient.patch(`/api/streamers/${id}`, payload);
  },

  syncStreamer: async (id: string): Promise<IStreamerItem> => {
    return apiClient.post(`/api/streamers/${id}/sync`);
  },

  getStreamerNotificationLogs: async (id: string): Promise<IStreamerNotificationLog[]> => {
    return apiClient.get(`/api/streamers/${id}/notification-logs`);
  },
};

export default StreamersService;
