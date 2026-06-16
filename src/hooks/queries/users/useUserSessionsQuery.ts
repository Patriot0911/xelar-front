import { useQuery } from '@tanstack/react-query';
import UsersService from '@/lib/services/users.service';
import { IUserSession } from '@/lib/models/users/user.model';
import { UsersQueryKey } from '@/lib/constants/users';

const useUserSessionsQuery = (userId: string) => {
  return useQuery<IUserSession[]>({
    queryKey: [UsersQueryKey.Sessions, userId],
    queryFn: () => UsersService.getUserSessions(userId),
    enabled: !!userId,
  });
};

export default useUserSessionsQuery;
