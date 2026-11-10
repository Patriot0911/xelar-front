import { apiClient } from '@/lib/api-client';
import { expectArray, expectList, expectObject } from '@/lib/errors';
import {
  IUpdateUserBalancePayload,
  IUpdateUserRolesPayload,
  IUpdateUserStatusPayload,
  IUserItem,
  IUserNotificationLogsParams,
  IUserNotificationLogsResponse,
  IUserSession,
  IUserSubscriptions,
  IUsersListParams,
  IUsersListResponse,
} from '@/lib/models/users/user.model';

const UsersService = {
  getUsers: async (params?: IUsersListParams): Promise<IUsersListResponse> => {
    return apiClient.get('/api/users', { params }).then(expectList<IUsersListResponse>('/api/users'));
  },

  getUserById: async (id: string): Promise<IUserItem> => {
    return apiClient.get(`/api/users/${id}`).then(expectObject<IUserItem>(`/api/users/${id}`));
  },

  getUserSessions: async (userId: string): Promise<IUserSession[]> => {
    return apiClient.get(`/api/users/${userId}/sessions`).then(expectArray<IUserSession[]>(`/api/users/${userId}/sessions`));
  },

  deleteUserSession: async (userId: string, sessionId: string): Promise<void> => {
    return apiClient.delete(`/api/users/${userId}/sessions/${sessionId}`);
  },

  updateUserRoles: async (userId: string, payload: IUpdateUserRolesPayload): Promise<void> => {
    return apiClient.patch(`/api/users/${userId}/roles`, payload);
  },

  updateUserStatus: async (userId: string, payload: IUpdateUserStatusPayload): Promise<void> => {
    return apiClient.patch(`/api/users/${userId}/status`, payload);
  },

  updateUserBalance: async (userId: string, payload: IUpdateUserBalancePayload): Promise<void> => {
    return apiClient.patch(`/api/users/${userId}/balance`, payload);
  },

  getUserSubscriptions: async (userId: string): Promise<IUserSubscriptions> => {
    return apiClient.get(`/api/users/${userId}/subscriptions`).then(expectObject<IUserSubscriptions>(`/api/users/${userId}/subscriptions`));
  },

  getUserNotificationLogs: async (
    userId: string,
    params?: IUserNotificationLogsParams,
  ): Promise<IUserNotificationLogsResponse> => {
    return apiClient.get(`/api/users/${userId}/notification-logs`, { params }).then(expectList<IUserNotificationLogsResponse>(`/api/users/${userId}/notification-logs`));
  },
};

export default UsersService;
