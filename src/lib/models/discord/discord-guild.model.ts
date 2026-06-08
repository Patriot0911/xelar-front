export interface IDiscordGuildModel {
  id: string;
  name: string;
  icon: string | null;
  banner: string | null;
  owner: boolean;
  permissions: string;
  features: string[];
  memberCount: number;
  presenceCount: number;
  balance: number;
  notificationCount: number;
  hasBot: boolean;
}
