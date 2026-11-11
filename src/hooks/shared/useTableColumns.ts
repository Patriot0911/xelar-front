'use client';

import { useCallback, useMemo, useSyncExternalStore } from 'react';
import type { ITableColumn, ITableColumnsVisibility } from '@/components/ui/Table/Table';

const STORAGE_PREFIX = 'xelar:table-columns:';

/** Only deviations from the column defaults are stored: `{ [columnKey]: isVisible }`. */
type TStoredVisibility = Record<string, boolean>;

// Same-tab writes don't fire `storage`, so the hook notifies its own subscribers.
const listeners = new Set<() => void>();
const notify = () => listeners.forEach((listener) => listener());

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  window.addEventListener('storage', listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', listener);
  };
};

// Storage can throw (private mode, blocked site data) — the table then just uses its defaults.
const readRaw = (key: string): string | null => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

const writeRaw = (key: string, value: TStoredVisibility) => {
  try {
    if (Object.keys(value).length) localStorage.setItem(key, JSON.stringify(value));
    else localStorage.removeItem(key);
  } catch {
    // Not persisted — the choice is lost on reload, nothing else breaks.
  }
  notify();
};

const parse = (raw: string | null): TStoredVisibility => {
  if (!raw) return {};
  try {
    const value: unknown = JSON.parse(raw);
    if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
    return Object.fromEntries(
      Object.entries(value).filter((entry): entry is [string, boolean] => typeof entry[1] === 'boolean'),
    );
  } catch {
    return {};
  }
};

const isDefaultVisible = <T,>(column: ITableColumn<T>) => column.defaultVisible ?? true;

/**
 * Which columns of a table are shown, remembered in `localStorage` under `storageKey`
 * (make it unique per table and per entity, e.g. `guild:<id>:bot-notifications`).
 * Nothing stored → each column's `defaultVisible`. Pass the result to `Table`'s `columnsVisibility`;
 * with no `storageKey` it returns `undefined` and the table has no column picker.
 */
const useTableColumns = <T,>(
  storageKey: string | undefined,
  columns: ITableColumn<T>[],
): ITableColumnsVisibility | undefined => {
  const fullKey = storageKey ? STORAGE_PREFIX + storageKey : null;

  // Server and first client render see `null` (defaults), so hydration matches; stored state applies right after.
  const raw = useSyncExternalStore(
    subscribe,
    () => (fullKey ? readRaw(fullKey) : null),
    () => null,
  );
  const stored = useMemo(() => parse(raw), [raw]);

  const isVisible = useCallback((key: string) => {
    const column = columns.find((c) => c.key === key);
    if (!column) return false;
    if (column.hideable === false) return true;
    return stored[key] ?? isDefaultVisible(column);
  }, [columns, stored]);

  const toggle = useCallback((key: string) => {
    if (!fullKey) return;
    const column = columns.find((c) => c.key === key);
    if (!column || column.hideable === false) return;

    const next = !isVisible(key);
    // Keep at least one column on screen.
    if (!next && columns.filter((c) => isVisible(c.key)).length <= 1) return;

    const value = { ...stored };
    if (next === isDefaultVisible(column)) delete value[key];
    else value[key] = next;
    writeRaw(fullKey, value);
  }, [columns, fullKey, isVisible, stored]);

  const reset = useCallback(() => {
    if (fullKey) writeRaw(fullKey, {});
  }, [fullKey]);

  return useMemo(() => {
    if (!fullKey) return undefined;
    const visibleCount = columns.filter((c) => isVisible(c.key)).length;
    return {
      isVisible,
      // The last visible column can't be switched off.
      canToggle: (key: string) => {
        const column = columns.find((c) => c.key === key);
        return !!column && column.hideable !== false && !(isVisible(key) && visibleCount <= 1);
      },
      toggle,
      reset,
      isCustomized: columns.some((c) => c.hideable !== false && isVisible(c.key) !== isDefaultVisible(c)),
    };
  }, [columns, fullKey, isVisible, reset, toggle]);
};

export default useTableColumns;
