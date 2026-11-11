import { apiClient } from '../api-client';
import { expectArray, expectList, expectObject, parseResponse } from '@/lib/errors';
import type { IDiscordGuildModel } from '../models/discord/discord-guild.model';
import type { IDiscordChannelModel } from '../models/discord/discord-channel.model';
import type { IDiscordRoleModel } from '../models/discord/discord-role.model';
import type {
  IGuildNotificationsParams,
  IGuildBotNotificationsResponse,
  IGuildWebhookNotificationsResponse,
  IDiscordBotNotificationModel,
  IWebhookNotificationModel,
  ICreateDiscordNotificationPayload,
  ICreateWebhookNotificationPayload,
  IUpdateDiscordNotificationPayload,
  IUpdateWebhookNotificationPayload,
} from '../models/discord/discord-notification.model';
import type { IDiscordGuildInfoModel } from '../models/discord/discord-guild-info.model';
import { guildInfoResponseSchema } from '../models/discord/discord-guild-info.scheme';

export enum DiscordQueryKey {
  Guilds             = 'discord-guilds',
  GuildNotifications = 'guild-notifications',
  MyNotifications    = 'my-notifications',
  GuildRoles         = 'discord-guild-roles',
  GuildChannels      = 'discord-guild-channels',
  GuildInfo          = 'discord-guild-info',
}

class DiscordService {
  static getGuilds(): Promise<IDiscordGuildModel[]> {
    return apiClient.get('/api/discord/guilds').then(expectArray<IDiscordGuildModel[]>('/api/discord/guilds'));
  }

  static getGuildBotNotifications(
    discordGuildId: string,
    params: IGuildNotificationsParams,
  ): Promise<IGuildBotNotificationsResponse> {
    return apiClient.get(`/api/twitch-notifications/discord/${discordGuildId}/bot`, { params }).then(expectList<IGuildBotNotificationsResponse>(`/api/twitch-notifications/discord/${discordGuildId}/bot`));
  }

  static getGuildWebhookNotifications(
    discordGuildId: string,
    params: IGuildNotificationsParams,
  ): Promise<IGuildWebhookNotificationsResponse> {
    return apiClient.get(`/api/twitch-notifications/discord/${discordGuildId}/webhook`, { params }).then(expectList<IGuildWebhookNotificationsResponse>(`/api/twitch-notifications/discord/${discordGuildId}/webhook`));
  }

  /** Bot notifications created by the current user, across all servers. */
  static getMyBotNotifications(params: IGuildNotificationsParams): Promise<IGuildBotNotificationsResponse> {
    const endpoint = '/api/twitch-notifications/bot';
    return apiClient.get(endpoint, { params }).then(expectList<IGuildBotNotificationsResponse>(endpoint));
  }

  /** Webhook notifications created by the current user. */
  static getMyWebhookNotifications(params: IGuildNotificationsParams): Promise<IGuildWebhookNotificationsResponse> {
    const endpoint = '/api/twitch-notifications/webhook';
    return apiClient.get(endpoint, { params }).then(expectList<IGuildWebhookNotificationsResponse>(endpoint));
  }

  static createDiscordNotification(data: ICreateDiscordNotificationPayload): Promise<IDiscordBotNotificationModel> {
    return apiClient.post('/api/twitch-notifications/discord', data);
  }

  static createWebhookNotification(guildId: string, data: ICreateWebhookNotificationPayload): Promise<IWebhookNotificationModel> {
    return apiClient.post(`/api/twitch-notifications/discord/${guildId}/webhook`, data);
  }

  static updateDiscordNotification(id: string, data: IUpdateDiscordNotificationPayload): Promise<IDiscordBotNotificationModel> {
    return apiClient.patch(`/api/twitch-notifications/discord/${id}`, data);
  }

  static updateWebhookNotification(id: string, data: IUpdateWebhookNotificationPayload): Promise<IWebhookNotificationModel> {
    return apiClient.patch(`/api/twitch-notifications/webhook/${id}`, data);
  }

  static deleteDiscordNotification(id: string): Promise<void> {
    return apiClient.delete(`/api/twitch-notifications/discord/${id}`);
  }

  static deleteWebhookNotification(id: string): Promise<void> {
    return apiClient.delete(`/api/twitch-notifications/webhook/${id}`);
  }

  static getGuildChannels(guildId: string): Promise<IDiscordChannelModel[]> {
    return apiClient.get(`/api/discord/guilds/${guildId}/channels`).then(expectArray<IDiscordChannelModel[]>(`/api/discord/guilds/${guildId}/channels`));
  }

  static getGuildRoles(guildId: string): Promise<IDiscordRoleModel[]> {
    return apiClient.get(`/api/discord/guilds/${guildId}/roles`).then(expectArray<IDiscordRoleModel[]>(`/api/discord/guilds/${guildId}/roles`));
  }

  static getGuildInfo(guildId: string): Promise<IDiscordGuildInfoModel> {
    const endpoint = `/api/discord/guilds/${guildId}`;
    // Full schema (not just the envelope): missing stats become null instead of crashing the hero.
    return apiClient.get(endpoint).then((data) => parseResponse(guildInfoResponseSchema, data, endpoint));
  }

  static setManagerPermission(guildId: string, permission: string | null): Promise<{ success: boolean }> {
    return apiClient.patch(`/api/discord/guilds/${guildId}/manager-permission`, { permission });
  }
}

export default DiscordService;
