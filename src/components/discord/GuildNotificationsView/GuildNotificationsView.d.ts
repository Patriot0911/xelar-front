import { TGuildNotificationRef } from '@/lib/models/discord';

export interface IGuildNotificationsViewProps {
  guildId: string;
};

export type TNotificationTarget = TGuildNotificationRef | null;
