import { IUserSession } from '@/lib/models/users/user.model';

export interface IUserSessionsTableProps {
  userId: string;
  sessions: IUserSession[];
  isLoading: boolean;
};
