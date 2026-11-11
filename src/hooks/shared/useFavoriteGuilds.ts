'use client';

import { useCallback, useMemo, useSyncExternalStore } from 'react';
import type { IFavoriteGuild } from '@/lib/models/discord';
import { readStorage, subscribeStorage, writeStorage } from '@/lib/local-storage';
import {
  FAVORITE_GUILDS_LIMIT,
  FAVORITE_GUILDS_STORAGE_KEY,
  parseFavoriteGuilds,
} from '@/lib/favorite-guilds';

const getSnapshot = () => readStorage(FAVORITE_GUILDS_STORAGE_KEY);
// Server and first client render see no favorites, so hydration matches; stored ones appear right after.
const getServerSnapshot = () => null;

// Writers always start from storage, not from the render's snapshot, so two quick clicks can't overwrite each other.
const readCurrent = () => parseFavoriteGuilds(readStorage(FAVORITE_GUILDS_STORAGE_KEY));

const save = (favorites: IFavoriteGuild[]) =>
  writeStorage(FAVORITE_GUILDS_STORAGE_KEY, favorites.length ? JSON.stringify(favorites) : null);

export type TAddFavoriteResult = 'added' | 'exists' | 'limit';

/**
 * Favorite servers, kept in this browser's `localStorage` (`xelar:favorite-guilds`), at most
 * `FAVORITE_GUILDS_LIMIT`. Every component using the hook re-renders on change, in this tab and others.
 */
const useFavoriteGuilds = () => {
  const raw = useSyncExternalStore(subscribeStorage, getSnapshot, getServerSnapshot);
  const favorites = useMemo(() => parseFavoriteGuilds(raw), [raw]);

  const isFavorite = useCallback((guildId: string) => favorites.some((item) => item.id === guildId), [favorites]);

  const add = useCallback((guild: IFavoriteGuild): TAddFavoriteResult => {
    const current = readCurrent();
    if (current.some((item) => item.id === guild.id)) return 'exists';
    if (current.length >= FAVORITE_GUILDS_LIMIT) return 'limit';
    save([...current, guild]);
    return 'added';
  }, []);

  const remove = useCallback((guildId: string) => {
    const current = readCurrent();
    const next = current.filter((item) => item.id !== guildId);
    if (next.length !== current.length) save(next);
  }, []);

  /** Refreshes the stored name / logo of a favorite (servers get renamed); no-op for other servers. */
  const update = useCallback((guild: IFavoriteGuild) => {
    const current = readCurrent();
    const index = current.findIndex((item) => item.id === guild.id);
    if (index === -1) return;
    const stored = current[index];
    if (stored.name === guild.name && stored.iconUrl === guild.iconUrl) return;
    save(current.map((item, i) => (i === index ? guild : item)));
  }, []);

  return {
    favorites,
    isFavorite,
    isFull: favorites.length >= FAVORITE_GUILDS_LIMIT,
    add,
    remove,
    update,
  };
};

export default useFavoriteGuilds;
