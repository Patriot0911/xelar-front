import { useSuspenseQuery } from '@tanstack/react-query';
import UsersService from '@/lib/services/users.service';
import { IUserItem } from '@/lib/models/users/user.model';
import { UsersQueryKey } from '@/lib/constants/users';

/** Suspense query: render inside an `AsyncBoundary`; `data` is always defined. */
const useUserDetailQuery = (userId: string) => {
  return useSuspenseQuery<IUserItem>({
    queryKey: [UsersQueryKey.Detail, userId],
    queryFn: () => UsersService.getUserById(userId),
  });
};

export default useUserDetailQuery;
