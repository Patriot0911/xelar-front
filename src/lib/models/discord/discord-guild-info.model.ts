import { IDiscordGuildModel } from './discord-guild.model';

export interface IDiscordGuildInfoModel extends IDiscordGuildModel {
  managerPermission: string | null;
};
