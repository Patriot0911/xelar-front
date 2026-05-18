export interface ITwitchAppShortModel {
  id: string;
  clientId: string;
  name: string;
  createdAt: string;
}

export interface ITwitchAppsListMeta {
  count: number;
}

export interface ITwitchAppsListResponse {
  items: ITwitchAppShortModel[];
  meta: ITwitchAppsListMeta;
}
