import { IFavoriteGuild } from '@/lib/models/discord';

export interface IGuildUnavailableProps {
  /** The saved entry — its name is all we still know about the server. */
  favorite: IFavoriteGuild;
};
