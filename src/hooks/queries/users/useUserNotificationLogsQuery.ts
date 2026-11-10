import { useQuery } from '@tanstack/react-query';
import UsersService from '@/lib/services/users.service';
import { IUserNotificationLogsResponse } from '@/lib/models/users/user.model';
import { USER_LOGS_PAGE_SIZE, UsersQueryKey } from '@/lib/constants/users';

const useUserNotificationLogsQuery = (userId: string, page: number) => {
  return useQuery<IUserNotificationLogsResponse>({
    queryKey: [UsersQueryKey.NotificationLogs, userId, page],
    queryFn: () => UsersService.getUserNotificationLogs(userId, { page, pageSize: USER_LOGS_PAGE_SIZE }),
    placeholderData: (prev) => prev,
    enabled: !!userId,
  });
};

export default useUserNotificationLogsQuery;
