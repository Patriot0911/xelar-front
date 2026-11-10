import { useQuery } from '@tanstack/react-query';
import UsersService from '@/lib/services/users.service';
import { IUsersListParams, IUsersListResponse } from '@/lib/models/users/user.model';
import { UsersQueryKey } from '@/lib/constants/users';

const useUsersQuery = (params?: IUsersListParams) => {
  return useQuery<IUsersListResponse>({
    queryKey: [UsersQueryKey.List, params],
    queryFn: () => UsersService.getUsers(params),
    placeholderData: (prev) => prev, // keep rows on screen while the next page / search loads
  });
};

export default useUsersQuery;
