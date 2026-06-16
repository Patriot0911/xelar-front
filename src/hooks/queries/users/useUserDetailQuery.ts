import { useQuery } from '@tanstack/react-query';
import UsersService from '@/lib/services/users.service';
import { IUserItem } from '@/lib/models/users/user.model';
import { UsersQueryKey } from '@/lib/constants/users';

const useUserDetailQuery = (userId: string) => {
  return useQuery<IUserItem>({
    queryKey: [UsersQueryKey.Detail, userId],
    queryFn: () => UsersService.getUserById(userId),
    enabled: !!userId,
  });
};

export default useUserDetailQuery;
