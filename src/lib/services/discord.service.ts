import { apiClient } from '../api-client';
import type { IDiscordGuildModel } from '../models/discord/discord-guild.model';
import type { IDiscordChannelModel } from '../models/discord/discord-channel.model';
import type { IDiscordRoleModel } from '../models/discord/discord-role.model';
import type {
  IGuildNotificationsResponse,
  IDiscordBotNotificationModel,
  IWebhookNotificationModel,
  ICreateDiscordNotificationPayload,
  ICreateWebhookNotificationPayload,
  IUpdateDiscordNotificationPayload,
  IUpdateWebhookNotificationPayload,
} from '../models/discord/discord-notification.model';
import type { IDiscordGuildInfoModel } from '../models/discord/discord-guild-info.model';

export enum DiscordQueryKey {
  Guilds             = 'discord-guilds',
  GuildNotifications = 'guild-notifications',
  AllNotifications   = 'all-notifications',
  GuildRoles         = 'discord-guild-roles',
  GuildInfo          = 'discord-guild-info',
}

class DiscordService {
  static getGuilds(): Promise<IDiscordGuildModel[]> {
    return apiClient.get('/api/discord/guilds');
  }

  static getGuildNotifications(discordGuildId: string): Promise<IGuildNotificationsResponse> {
    return apiClient.get(`/api/twitch-notifications/discord/${discordGuildId}`);
  }

  static getAllNotifications(): Promise<IGuildNotificationsResponse> {
    return apiClient.get('/api/twitch-notifications');
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

  static getGuildChannels(guildId: string): Promise<IDiscordChannelModel[]> {
    return apiClient.get(`/api/discord/guilds/${guildId}/channels`);
  }

  static getGuildRoles(guildId: string): Promise<IDiscordRoleModel[]> {
    return apiClient.get(`/api/discord/guilds/${guildId}/roles`);
  }

  static getGuildInfo(guildId: string): Promise<IDiscordGuildInfoModel> {
    return apiClient.get(`/api/discord/guilds/${guildId}`);
  }

  static setManagerRole(guildId: string, roleId: string | null): Promise<{ success: boolean }> {
    return apiClient.patch(`/api/discord/guilds/${guildId}/manager-role`, { roleId });
  }
}

export default DiscordService;
