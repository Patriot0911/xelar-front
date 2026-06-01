import { Permission } from '@/lib/constants/permissions';

export interface IUserPayloadModel {
  id: string;
  displayName: string;
  discordId?: string | null;
  roles: string[];
  permissions: Permission[];
};
