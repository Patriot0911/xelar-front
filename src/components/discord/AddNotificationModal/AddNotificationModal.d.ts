import { IModalBaseProps } from '@/components/ui/Modal/Modal';
import { TGuildNotificationRef } from '@/lib/models/discord';

export interface IAddNotificationModalProps extends IModalBaseProps {
  guildId: string;
  /** Pre-fills the form from an existing notification ("Duplicate"). */
  template?: TGuildNotificationRef | null;
}
