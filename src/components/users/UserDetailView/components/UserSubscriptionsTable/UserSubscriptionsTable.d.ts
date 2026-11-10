import { IUserBotSubscriptionsResponse, IUserWebhookSubscriptionsResponse } from '@/lib/models/users/user.model';

interface IUserSubscriptionsTableBaseProps {
  isLoading: boolean;
  page: number;
  onPageChange: (page: number) => void;
};

export type IUserSubscriptionsTableProps =
  | (IUserSubscriptionsTableBaseProps & { type: 'bot'; data?: IUserBotSubscriptionsResponse })
  | (IUserSubscriptionsTableBaseProps & { type: 'webhook'; data?: IUserWebhookSubscriptionsResponse });
