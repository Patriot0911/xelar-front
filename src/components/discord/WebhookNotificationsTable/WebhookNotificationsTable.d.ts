import { IGuildWebhookNotificationsResponse, IWebhookNotificationModel } from '@/lib/models/discord';

export interface IWebhookNotificationsTableProps {
  data?: IGuildWebhookNotificationsResponse;
  isLoading: boolean;
  /** Pagination is rendered only when both `page` and `onPageChange` are passed. */
  /** Overrides the default empty message (e.g. "Nothing matches …" while searching). */
  emptyText?: string;
  /** Enables the column picker; the choice is stored under this key (see `useTableColumns`). */
  columnsStorageKey?: string;
  page?: number;
  onPageChange?: (page: number) => void;
  onEdit: (item: IWebhookNotificationModel) => void;
  onDelete: (item: IWebhookNotificationModel) => void;
  /** Adds a "Duplicate" row action that starts a new notification from this one. */
  onDuplicate?: (item: IWebhookNotificationModel) => void;
};
