export interface IShowcaseStreamer {
  twitchLogin: string;
  displayName: string;
  profileImageUrl: string | null;
  isPartner: boolean;
  rank: number;
  isTopActive: boolean;
  notificationsDelivered: number;
  communitiesReached: number;
  lastNotifiedAt: string | null;
};

export interface IShowcaseStats {
  totalStreamers: number;
  notificationsDelivered: number;
  notificationsDeliveredRecent: number;
  communitiesReached: number;
};

export interface IStreamersShowcase {
  streamers: IShowcaseStreamer[];
  stats: IShowcaseStats;
  activityWindowDays: number;
  generatedAt: string;
};
