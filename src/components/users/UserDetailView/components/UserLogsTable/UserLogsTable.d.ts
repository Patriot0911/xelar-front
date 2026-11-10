import { IUserNotificationLogsResponse } from '@/lib/models/users/user.model';

export interface IUserLogsTableProps {
  data?: IUserNotificationLogsResponse;
  isLoading: boolean;
  page: number;
  onPageChange: (page: number) => void;
};
