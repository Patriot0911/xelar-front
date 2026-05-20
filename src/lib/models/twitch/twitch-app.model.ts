export type TwitchAppType   = 'active' | 'internal' | 'locked';
export type TwitchAppHealth = 'healthy' | 'degraded';

export interface ITwitchAppShortModel {
  id: string;
  clientId: string;
  name: string;
  createdAt: string;
  // Extended fields returned by API v2
  type?: TwitchAppType;
  health?: TwitchAppHealth;
  load?: number;
  scope?: string;
  lastEvent?: string;
}

export interface ITwitchAppsListMeta {
  count: number;
}

export interface ITwitchAppsListResponse {
  items: ITwitchAppShortModel[];
  meta: ITwitchAppsListMeta;
}
