export interface IStreamerRef {
  broadcasterId: string;
  twitchLogin: string;
  displayName: string;
  profileImageUrl?: string | null;
}

export interface IStreamerEventRef {
  event: string;
  streamer: IStreamerRef;
}

// todo: rework interface
export interface IDiscordBotNotificationModel {
  id: string;
  channelId: string;
  guildId: string;
  costType: string;
  cost: number;
  status: 'active' | 'suspended';
  messagePayload: unknown;
  createdAt: string;
  streamerEvent: IStreamerEventRef;
}

export interface IWebhookNotificationModel {
  id: string;
  type: string;
  costType: string;
  cost: number;
  messagePayload: unknown;
  createdAt: string;
  streamerEvent: IStreamerEventRef;
}

export interface IGuildNotificationsResponse {
  bot: IDiscordBotNotificationModel[];
  webhook: IWebhookNotificationModel[];
}

export type DiscordErrorCode = 'DISCORD_NOT_CONNECTED' | 'DISCORD_TOKEN_REVOKED';

export interface ICreateDiscordNotificationPayload {
  broadcasterId: string;
  event: string;
  costType: string;
  payload: Record<string, unknown>;
  guildId: string;
  channelId: string;
}

export interface ICreateWebhookNotificationPayload {
  broadcasterId: string;
  event: string;
  costType: string;
  payload: Record<string, unknown>;
  webhookUrl: string;
}

export interface IUpdateDiscordNotificationPayload {
  costType?: string;
  channelId?: string;
  payload?: Record<string, unknown>;
}

export interface IUpdateWebhookNotificationPayload {
  costType?: string;
  webhookUrl?: string;
  payload?: Record<string, unknown>;
}

export function isDiscordAuthError(error: unknown): boolean {
  if (!error || typeof error !== 'object') return false;
  const code = (error as Record<string, unknown>).data;
  return code === 'DISCORD_NOT_CONNECTED' || code === 'DISCORD_TOKEN_REVOKED';
}
