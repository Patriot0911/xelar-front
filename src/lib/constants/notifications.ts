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

export const TWITCH_EVENT_LABELS: Record<TwitchStreamerEvent, string> = {
  [TwitchStreamerEvent.STREAM_ONLINE]:     'Stream Online',
  [TwitchStreamerEvent.STREAM_OFFLINE]:    'Stream Offline',
  [TwitchStreamerEvent.CHANNEL_UPDATE]:    'Channel Update',
  [TwitchStreamerEvent.CHANNEL_RAID]:      'Channel Raid',
  [TwitchStreamerEvent.CHANNEL_SUBSCRIBE]: 'Channel Subscribe',
  [TwitchStreamerEvent.CHANNEL_CHEER]:     'Channel Cheer',
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
