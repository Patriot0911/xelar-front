import { TwitchAppStatus } from '@/lib/constants/twitch-app-status';
import { IGenericList } from '../generic-response.model';

export interface ITwitchAppShortModel {
  id: string;
  clientId: string;
  status: TwitchAppStatus;
  name: string;
  createdAt: Date;
};

export interface ICreateTwitchAppModel {
  name: string;
  clientId: string;
  clientSecret: string;
  webhookSecret?: string;
};

export interface IEditTwitchAppModel {
  appId: string;
  name?: string;
  clientSecret?: string;
  webhookSecret?: string;
};

export type TTwitchAppsListModel = IGenericList<ITwitchAppShortModel>;
