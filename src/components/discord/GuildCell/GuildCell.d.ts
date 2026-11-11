import { INotificationGuildRef } from '@/lib/models/discord';

export interface IGuildCellProps {
  /** `null` / missing for webhooks that don't belong to a server. */
  guild?: INotificationGuildRef | null;
};
