import { PropsWithChildren } from 'react';
import { Permission } from '@/lib/constants/permissions';

export interface IPermissionGuardProps extends PropsWithChildren {
  requiredPermissions: Permission[];
  redirectTo?: string;
}
