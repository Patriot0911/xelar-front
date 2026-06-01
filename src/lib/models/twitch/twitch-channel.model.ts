export interface ITwitchChannelModel {
  broadcasterId: string;
  broadcasterLogin: string;
  displayName: string;
  thumbnailUrl: string;
  isLive: boolean;
  gameName?: string;
}

export interface ITwitchChannelsResponse {
  items: ITwitchChannelModel[];
  meta: { cursor?: string };
}
