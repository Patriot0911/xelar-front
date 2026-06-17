import { Permission } from '@/lib/constants/permissions';

export interface IUserPayloadModel {
  id: string;
  displayName: string;
  discordId?: string | null;
  twitchLogin?: string | null;
  allowPersonalSubscriptions: boolean;
  balance: number;
  roles: string[];
  permissions: Permission[];
};
