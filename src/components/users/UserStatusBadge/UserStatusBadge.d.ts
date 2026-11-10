import { AccountStatus } from '@/lib/models/users/user.model';

export interface IUserStatusBadgeProps {
  status: AccountStatus;
  className?: string;
};
