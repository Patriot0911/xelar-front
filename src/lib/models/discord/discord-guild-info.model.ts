import { IDiscordGuildModel } from './discord-guild.model';

export interface IDiscordGuildInfoModel extends IDiscordGuildModel {
  managerPermission: string | null;
  botNotificationCount: number;
  webhookNotificationCount: number;
  /** Distinct Twitch events (streamer + event type) this server is notified about. */
  subscriptionCount: number;
};
