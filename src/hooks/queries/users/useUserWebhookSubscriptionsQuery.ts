import { useQuery } from '@tanstack/react-query';
import UsersService from '@/lib/services/users.service';
import { IUserWebhookSubscriptionsResponse } from '@/lib/models/users/user.model';
import { USER_SUBSCRIPTIONS_PAGE_SIZE, UsersQueryKey } from '@/lib/constants/users';
import { GuildNotificationType } from '@/lib/constants/guild-notifications';

const useUserWebhookSubscriptionsQuery = (userId: string, page: number) => {
  return useQuery<IUserWebhookSubscriptionsResponse>({
    queryKey: [UsersQueryKey.Subscriptions, userId, GuildNotificationType.Webhook, page],
    queryFn: () => UsersService.getUserWebhookSubscriptions(userId, { page, pageSize: USER_SUBSCRIPTIONS_PAGE_SIZE }),
    placeholderData: (prev) => prev,
  });
};

export default useUserWebhookSubscriptionsQuery;
