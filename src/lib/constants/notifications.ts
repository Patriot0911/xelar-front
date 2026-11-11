import type { NotificationLogStatus, NotificationLogType } from '@/lib/models/notification-log.model';

export enum TwitchStreamerEvent {
  STREAM_ONLINE     = 'stream.online',
  STREAM_OFFLINE    = 'stream.offline',
  CHANNEL_UPDATE    = 'channel.update',
  CHANNEL_RAID      = 'channel.raid',
  CHANNEL_SUBSCRIBE = 'channel.subscribe',
  CHANNEL_CHEER     = 'channel.cheer',
}

// Events that don't require the streamer to have authorized personal (free) subscriptions.
export const PUBLIC_TWITCH_EVENTS: TwitchStreamerEvent[] = [
  TwitchStreamerEvent.STREAM_ONLINE,
];

/**
 * User-facing names of Twitch stream events — the single dictionary for every place an event is shown
 * to a person (event pickers, notification lists, activity logs). Raw `stream.online`-style values
 * stay in admin-only views.
 */
export const TWITCH_EVENT_LABELS: Record<TwitchStreamerEvent, string> = {
  [TwitchStreamerEvent.STREAM_ONLINE]:     'Stream started',
  [TwitchStreamerEvent.STREAM_OFFLINE]:    'Stream ended',
  [TwitchStreamerEvent.CHANNEL_UPDATE]:    'Stream info updated',
  [TwitchStreamerEvent.CHANNEL_RAID]:      'Incoming raid',
  [TwitchStreamerEvent.CHANNEL_SUBSCRIBE]: 'New subscriber',
  [TwitchStreamerEvent.CHANNEL_CHEER]:     'Bits cheer',
};

/** Friendly name for a raw event value; unknown values fall back to the raw string, empty ones to "—". */
export const getTwitchEventLabel = (event: string | null | undefined): string => {
  if (!event) return '—';
  return TWITCH_EVENT_LABELS[event as TwitchStreamerEvent] ?? event;
};

/** Delivery outcome of a notification log entry, worded for regular users. */
export const NOTIFICATION_LOG_STATUS_LABELS: Record<NotificationLogStatus, string> = {
  sent:   'Delivered',
  failed: 'Not delivered',
};

export const NOTIFICATION_LOG_TYPE_LABELS: Record<NotificationLogType, string> = {
  discord: 'Bot message',
  webhook: 'Webhook',
};

export enum NotificationCostType {
  Personal = 'personal',
  Credit   = 'credit',
  Guild    = 'guild',
}

export const COST_TYPE_LABELS: Record<NotificationCostType, string> = {
  [NotificationCostType.Personal]: 'Personal',
  [NotificationCostType.Credit]:   'Credit',
  [NotificationCostType.Guild]:    'Guild',
};

/** Whose balance pays for a notification — wording for admin views. */
export const COST_SOURCE_LABELS: Record<NotificationCostType, string> = {
  [NotificationCostType.Personal]: 'User balance',
  [NotificationCostType.Credit]:   'Streamer credit',
  [NotificationCostType.Guild]:    'Server balance',
};
