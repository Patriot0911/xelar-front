import { IGenericList, IGenericPagination } from '@/lib/models/generic-response.model';

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

export interface INotificationGuildRef {
  discordGuildId: string;
}

// todo: rework interface
export interface IDiscordBotNotificationModel {
  id: string;
  channelId: string;
  guildId: string;
  guild?: INotificationGuildRef;
  costType: string;
  cost: number;
  status: 'active' | 'suspended';
  messagePayload: unknown;
  isDisabled: boolean;
  gameFilters: string[];
  createdAt: string;
  /** Latest successful delivery; `null` if it has never been sent. */
  lastSentAt: string | null;
  streamerEvent: IStreamerEventRef;
}

export interface IWebhookNotificationModel {
  id: string;
  /** Present when the webhook belongs to a server (created from a guild page). */
  guild?: INotificationGuildRef | null;
  type: string;
  costType: string;
  cost: number;
  messagePayload: unknown;
  isDisabled: boolean;
  gameFilters: string[];
  createdAt: string;
  /** Latest successful delivery; `null` if it has never been sent. */
  lastSentAt: string | null;
  streamerEvent: IStreamerEventRef;
}

/** A notification together with its delivery type — the unit edit / delete / duplicate act on. */
export type TGuildNotificationRef =
  | { type: 'bot'; item: IDiscordBotNotificationModel }
  | { type: 'webhook'; item: IWebhookNotificationModel };

export interface IGuildNotificationsParams extends IGenericPagination {
  /** Matches streamer name / login and event type. */
  search?: string;
}

export interface IGuildBotNotificationsResponse extends IGenericList<IDiscordBotNotificationModel> {}

export interface IGuildWebhookNotificationsResponse extends IGenericList<IWebhookNotificationModel> {}

export interface ICreateDiscordNotificationPayload {
  broadcasterId: string;
  event: string;
  costType: string;
  payload: Record<string, unknown>;
  guildId: string;
  channelId: string;
  gameFilters?: string[];
}

export interface ICreateWebhookNotificationPayload {
  broadcasterId: string;
  event: string;
  costType: string;
  payload: Record<string, unknown>;
  webhookUrl: string;
  gameFilters?: string[];
}

export interface IUpdateDiscordNotificationPayload {
  costType?: string;
  channelId?: string;
  payload?: Record<string, unknown>;
  isDisabled?: boolean;
  gameFilters?: string[];
}

export interface IUpdateWebhookNotificationPayload {
  costType?: string;
  webhookUrl?: string;
  payload?: Record<string, unknown>;
  isDisabled?: boolean;
  gameFilters?: string[];
}

