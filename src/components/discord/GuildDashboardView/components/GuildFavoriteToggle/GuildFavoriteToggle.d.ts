import { IFavoriteGuild } from '@/lib/models/discord';

export interface IGuildFavoriteToggleProps {
  guild: IFavoriteGuild;
  className?: string;
};
