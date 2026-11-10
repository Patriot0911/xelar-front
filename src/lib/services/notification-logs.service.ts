import { apiClient } from '../api-client';
import { expectList } from '@/lib/errors';
import type { INotificationLogsResponse } from '../models/notification-log.model';

export enum NotificationLogsQueryKey {
  GuildLogs = 'notification-logs-guild',
  MyLogs    = 'notification-logs-my',
}

class NotificationLogsService {
  static getGuildLogs(
    guildId: string,
    page: number,
    pageSize: number,
  ): Promise<INotificationLogsResponse> {
    const endpoint = `/api/notification-logs/guild/${guildId}`;
    return apiClient
      .get(endpoint, { params: { page, pageSize } })
      .then(expectList<INotificationLogsResponse>(endpoint));
  }

  static getMyLogs(page: number, pageSize: number): Promise<INotificationLogsResponse> {
    return apiClient.get('/api/notification-logs/my', { params: { page, pageSize } }).then(expectList<INotificationLogsResponse>('/api/notification-logs/my'));
  }
}

export default NotificationLogsService;
