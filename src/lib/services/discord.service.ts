import { apiClient } from '../api-client';
import type { IDiscordGuildModel } from '../models/discord/discord-guild.model';
import type { IGuildNotificationsResponse } from '../models/discord/discord-notification.model';

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
}

export default DiscordService;
