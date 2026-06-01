'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { LuSearch, LuX, LuLoader, LuRadio } from 'react-icons/lu';
import TwitchAppService from '@/lib/services/twitch-app.service';
import PortalDropdown from '@/components/ui/PortalDropdown';
import type { ITwitchChannelModel } from '@/lib/models/twitch/twitch-channel.model';
import type { TAddNotificationForm } from '../add-notification.scheme';
import styles from './styles.module.scss';

const DEBOUNCE_MS = 350;
const MIN_LENGTH = 3;

const StreamerSearchField = () => {
  const { control } = useFormContext<TAddNotificationForm>();
  const { field } = useController({ name: 'broadcasterId', control });

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ITwitchChannelModel[]>([]);
  const [selected, setSelected] = useState<ITwitchChannelModel | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const anchorRef = useRef<HTMLDivElement>(null);

  const search = useCallback(async (q: string) => {
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();

    setIsLoading(true);
    try {
      const res = await TwitchAppService.searchChannels(q, abortRef.current.signal);
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
    if (!isOpen) return;
    const onClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (anchorRef.current && !anchorRef.current.contains(target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [isOpen]);

  const handleSelect = (channel: ITwitchChannelModel) => {
    setSelected(channel);
    field.onChange(channel.broadcasterId);
    setQuery('');
    setResults([]);
    setIsOpen(false);
  };

  const handleClear = () => {
    setSelected(null);
    field.onChange('');
    setQuery('');
    setResults([]);
  };

  return (
    <div className={styles.root}>
      <div className={styles.labelRow}>
        <label className={styles.label}>Streamer</label>
      </div>

      {selected ? (
        <div className={styles.selectedCard}>
          {selected.thumbnailUrl ? (
            <img
              src={selected.thumbnailUrl}
              alt={selected.displayName}
              className={styles.selectedAvatar}
              width={32}
              height={32}
            />
          ) : (
            <div className={styles.selectedAvatarFallback}>
              {selected.displayName[0].toUpperCase()}
            </div>
          )}
          <div className={styles.selectedMeta}>
            <span className={styles.selectedName}>{selected.displayName}</span>
            <span className={styles.selectedLogin}>{selected.broadcasterLogin}</span>
          </div>
          {selected.isLive && (
            <span className={styles.liveBadge}>
              <LuRadio size={9} />
              LIVE
            </span>
          )}
          <button
            type="button"
            className={styles.clearBtn}
            onClick={handleClear}
            aria-label="Clear selection"
          >
            <LuX size={14} />
          </button>
        </div>
      ) : (
        <div className={styles.inputWrap} ref={anchorRef}>
          <LuSearch size={14} className={styles.searchIcon} />
          <input
            className={styles.input}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by streamer name…"
            autoComplete="off"
            onFocus={() => results.length > 0 && setIsOpen(true)}
          />
          {isLoading && <LuLoader size={14} className={styles.loader} />}
        </div>
      )}

      <PortalDropdown anchorRef={anchorRef} isOpen={isOpen && results.length > 0}>
        <div className={styles.dropdown}>
          {results.map((ch) => (
            <button
              key={ch.broadcasterId}
              type="button"
              className={styles.option}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleSelect(ch)}
            >
              {ch.thumbnailUrl ? (
                <img
                  src={ch.thumbnailUrl}
                  alt={ch.displayName}
                  className={styles.optionAvatar}
                  width={28}
                  height={28}
                />
              ) : (
                <div className={styles.optionAvatarFallback}>
                  {ch.displayName[0].toUpperCase()}
                </div>
              )}
              <div className={styles.optionMeta}>
                <span className={styles.optionName}>{ch.displayName}</span>
                <span className={styles.optionLogin}>{ch.broadcasterLogin}</span>
              </div>
              {ch.isLive && (
                <span className={styles.liveBadge}>
                  <LuRadio size={9} />
                  LIVE
                </span>
              )}
            </button>
          ))}
        </div>
      </PortalDropdown>

      <span className={styles.hint}>
        Type at least {MIN_LENGTH} characters to search. The broadcaster ID is set automatically.
      </span>
    </div>
  );
};

export default StreamerSearchField;
