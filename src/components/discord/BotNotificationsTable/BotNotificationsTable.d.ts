import { IDiscordBotNotificationModel, IGuildBotNotificationsResponse } from '@/lib/models/discord';

export interface IBotNotificationsTableProps {
  /** Fallback guild for channel names when a row has no `guild` relation. */
  guildId?: string;
  data?: IGuildBotNotificationsResponse;
  isLoading: boolean;
  /** Pagination is rendered only when both `page` and `onPageChange` are passed. */
  page?: number;
  onPageChange?: (page: number) => void;
  onEdit: (item: IDiscordBotNotificationModel) => void;
  onDelete: (item: IDiscordBotNotificationModel) => void;
};
