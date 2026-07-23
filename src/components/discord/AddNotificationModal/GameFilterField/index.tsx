'use client';

import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { LuSearch, LuX, LuLoader } from 'react-icons/lu';
import TwitchAppService from '@/lib/services/twitch-app.service';
import useGameNamesQuery from '@/hooks/queries/twitch/useGameNamesQuery';
import type { ITwitchCategoryModel } from '@/lib/models/twitch/twitch-category.model';
import styles from './styles.module.scss';

const DEBOUNCE_MS = 350;
const MIN_LENGTH = 1;

const GameFilterField = () => {
  const { control } = useFormContext<{ gameFilters: string[] }>();
  const { field } = useController({ name: 'gameFilters', control });

  const selectedIds = field.value ?? [];

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ITwitchCategoryModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [nameCache, setNameCache] = useState<Record<string, ITwitchCategoryModel>>({});

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const unresolvedIds = useMemo(
    () => selectedIds.filter((id) => !nameCache[id]),
    [selectedIds, nameCache],
  );
  const { data: resolvedGames } = useGameNamesQuery(unresolvedIds);

  useEffect(() => {
    if (!resolvedGames?.length) return;
    setNameCache((prev) => {
      const next = { ...prev };
      resolvedGames.forEach((g) => { next[g.id] = g; });
      return next;
    });
  }, [resolvedGames]);

  const search = useCallback(async (q: string) => {
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();

    setIsLoading(true);
    try {
      const res = await TwitchAppService.searchCategories(q, abortRef.current.signal);
      setResults(res.items);
      setIsOpen(res.items.length > 0);
    } catch (e: unknown) {
      if ((e as { code?: string }).code !== 'ERR_CANCELED') {
        setResults([]);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!query.trim() || query.length < MIN_LENGTH) {
      if (timerRef.current) clearTimeout(timerRef.current);
      setResults([]);
      setIsOpen(false);
      setIsLoading(false);
      return;
    }

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => search(query), DEBOUNCE_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [query, search]);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const handleSelect = (game: ITwitchCategoryModel) => {
    if (!selectedIds.includes(game.id)) {
      field.onChange([...selectedIds, game.id]);
      setNameCache((prev) => ({ ...prev, [game.id]: game }));
    }
    setQuery('');
    setResults([]);
    setIsOpen(false);
  };

  const handleRemove = (gameId: string) => {
    field.onChange(selectedIds.filter((id) => id !== gameId));
  };

  return (
    <div className={styles.root} ref={rootRef}>
      <div className={styles.labelRow}>
        <label className={styles.label}>Game filters</label>
      </div>

      {selectedIds.length > 0 && (
        <div className={styles.chips}>
          {selectedIds.map((id) => (
            <span key={id} className={styles.chip}>
              {nameCache[id]?.boxArtUrl && (
                <img src={nameCache[id].boxArtUrl} alt="" className={styles.chipArt} width={16} height={22} />
              )}
              {nameCache[id]?.name ?? id}
              <button
                type="button"
                className={styles.chipRemove}
                onClick={() => handleRemove(id)}
                aria-label="Remove filter"
              >
                <LuX size={11} />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className={styles.inputWrap}>
        <LuSearch size={14} className={styles.searchIcon} />
        <input
          className={styles.input}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search a game/category to add a filter…"
          autoComplete="off"
          onFocus={() => results.length > 0 && setIsOpen(true)}
        />
        {isLoading && <LuLoader size={14} className={styles.loader} />}
      </div>

      {isOpen && results.length > 0 && (
        <div className={styles.dropdown}>
          {results.map((game) => (
            <button
              key={game.id}
              type="button"
              className={styles.option}
              disabled={selectedIds.includes(game.id)}
              onClick={() => handleSelect(game)}
            >
              {game.boxArtUrl && (
                <img src={game.boxArtUrl} alt="" className={styles.optionArt} width={24} height={32} />
              )}
              <span className={styles.optionName}>{game.name}</span>
            </button>
          ))}
        </div>
      )}

      <span className={styles.hint}>
        Leave empty to send this notification for every game. Add one or more games to only notify when the stream starts under a matching category.
      </span>
    </div>
  );
};

export default GameFilterField;
