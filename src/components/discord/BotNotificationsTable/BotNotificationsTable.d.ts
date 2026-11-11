import { IDiscordBotNotificationModel, IGuildBotNotificationsResponse } from '@/lib/models/discord';

export interface IBotNotificationsTableProps {
  /** Fallback guild for channel names when a row has no `guild` relation. */
  guildId?: string;
  /** Adds a "Server" column — for lists that mix notifications from several servers. */
  showGuild?: boolean;
  data?: IGuildBotNotificationsResponse;
  isLoading: boolean;
  /** Pagination is rendered only when both `page` and `onPageChange` are passed. */
  /** Overrides the default empty message (e.g. "Nothing matches …" while searching). */
  emptyText?: string;
  /** Enables the column picker; the choice is stored under this key (see `useTableColumns`). */
  columnsStorageKey?: string;
  page?: number;
  onPageChange?: (page: number) => void;
  onEdit: (item: IDiscordBotNotificationModel) => void;
  onDelete: (item: IDiscordBotNotificationModel) => void;
  /** Adds a "Duplicate" row action that starts a new notification from this one. */
  onDuplicate?: (item: IDiscordBotNotificationModel) => void;
};
