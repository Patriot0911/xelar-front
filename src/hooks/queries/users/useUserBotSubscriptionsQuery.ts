import { useQuery } from '@tanstack/react-query';
import UsersService from '@/lib/services/users.service';
import { IUserBotSubscriptionsResponse } from '@/lib/models/users/user.model';
import { USER_SUBSCRIPTIONS_PAGE_SIZE, UsersQueryKey } from '@/lib/constants/users';
import { GuildNotificationType } from '@/lib/constants/guild-notifications';

const useUserBotSubscriptionsQuery = (userId: string, page: number) => {
  return useQuery<IUserBotSubscriptionsResponse>({
    queryKey: [UsersQueryKey.Subscriptions, userId, GuildNotificationType.Bot, page],
    queryFn: () => UsersService.getUserBotSubscriptions(userId, { page, pageSize: USER_SUBSCRIPTIONS_PAGE_SIZE }),
    placeholderData: (prev) => prev,
  });
};

export default useUserBotSubscriptionsQuery;
