import type { IFavoriteGuild } from '@/lib/models/discord';
import { getGuildIconUrl } from '@/lib/guild-visuals';

/** How many servers a user can keep in favorites. */
export const FAVORITE_GUILDS_LIMIT = 3;

/** `localStorage` key; the value is a JSON array of `IFavoriteGuild`. */
export const FAVORITE_GUILDS_STORAGE_KEY = 'xelar:favorite-guilds';

interface IGuildLike {
  id: string;
  name: string;
  icon: string | null;
}

export const toFavoriteGuild = (guild: IGuildLike): IFavoriteGuild => ({
  id: guild.id,
  name: guild.name,
  iconUrl: getGuildIconUrl(guild.id, guild.icon, 64),
});

const isFavoriteGuild = (value: unknown): value is IFavoriteGuild => {
  if (!value || typeof value !== 'object') return false;
  const item = value as Record<string, unknown>;
  return typeof item.id === 'string' && item.id.length > 0
    && typeof item.name === 'string'
    && (item.iconUrl === null || typeof item.iconUrl === 'string');
};

/** Tolerant parse: anything malformed (hand-edited storage, older format) is dropped, never thrown. */
export const parseFavoriteGuilds = (raw: string | null): IFavoriteGuild[] => {
  if (!raw) return [];
  try {
    const value: unknown = JSON.parse(raw);
    if (!Array.isArray(value)) return [];
    const unique = new Map<string, IFavoriteGuild>();
    value.filter(isFavoriteGuild).forEach((item) => {
      if (!unique.has(item.id)) unique.set(item.id, { id: item.id, name: item.name, iconUrl: item.iconUrl });
    });
    return [...unique.values()].slice(0, FAVORITE_GUILDS_LIMIT);
  } catch {
    return [];
  }
};
