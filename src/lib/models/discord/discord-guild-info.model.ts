import { IDiscordGuildModel } from './discord-guild.model';

/**
 * Server info for the guild page. Statistics are `null` when the API doesn't report them
 * (e.g. an older backend without the per-type counters) — render them as "—", never crash.
 */
export interface IDiscordGuildInfoModel
  extends Omit<IDiscordGuildModel, 'memberCount' | 'presenceCount' | 'balance' | 'notificationCount'> {
  managerPermission: string | null;
  memberCount: number | null;
  presenceCount: number | null;
  balance: number | null;
  notificationCount: number | null;
  botNotificationCount: number | null;
  webhookNotificationCount: number | null;
  /** Distinct Twitch events (streamer + event type) this server is notified about. */
  subscriptionCount: number | null;
};
