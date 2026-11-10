import { IGuildWebhookNotificationsResponse, IWebhookNotificationModel } from '@/lib/models/discord';

export interface IWebhookNotificationsTableProps {
  data?: IGuildWebhookNotificationsResponse;
  isLoading: boolean;
  /** Pagination is rendered only when both `page` and `onPageChange` are passed. */
  page?: number;
  onPageChange?: (page: number) => void;
  onEdit: (item: IWebhookNotificationModel) => void;
  onDelete: (item: IWebhookNotificationModel) => void;
};
