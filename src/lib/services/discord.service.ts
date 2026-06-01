import { apiClient } from '../api-client';
import type { IDiscordGuildModel } from '../models/discord/discord-guild.model';
import type { IDiscordChannelModel } from '../models/discord/discord-channel.model';
import type {
  IGuildNotificationsResponse,
  IDiscordBotNotificationModel,
  IWebhookNotificationModel,
  ICreateDiscordNotificationPayload,
  ICreateWebhookNotificationPayload,
} from '../models/discord/discord-notification.model';

export enum DiscordQueryKey {
  Guilds            = 'discord-guilds',
  GuildNotifications = 'guild-notifications',
  AllNotifications  = 'all-notifications',
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

  static getGuildChannels(guildId: string): Promise<IDiscordChannelModel[]> {
    return apiClient.get(`/api/discord/guilds/${guildId}/channels`);
  }
}

export default DiscordService;
