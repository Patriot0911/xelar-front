import { IGenericList } from '../generic-response.model';

export interface ITwitchAppShortModel {
  id: string;
  clientId: string;
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
