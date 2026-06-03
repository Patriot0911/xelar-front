import { apiClient } from '../api-client';
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
    return apiClient.get(`/api/notification-logs/guild/${guildId}`, {
      params: { page, pageSize },
    });
  }

  static getMyLogs(page: number, pageSize: number): Promise<INotificationLogsResponse> {
    return apiClient.get('/api/notification-logs/my', { params: { page, pageSize } });
  }
}

export default NotificationLogsService;
