'use client';

import { useCallback, useMemo, useSyncExternalStore } from 'react';
import type { ITableColumn, ITableColumnsVisibility } from '@/components/ui/Table/Table';
import { readStorage, subscribeStorage, writeStorage } from '@/lib/local-storage';

const STORAGE_PREFIX = 'xelar:table-columns:';

/** Only deviations from the column defaults are stored: `{ [columnKey]: isVisible }`. */
type TStoredVisibility = Record<string, boolean>;

const writeVisibility = (key: string, value: TStoredVisibility) =>
  writeStorage(key, Object.keys(value).length ? JSON.stringify(value) : null);

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
    subscribeStorage,
    () => (fullKey ? readStorage(fullKey) : null),
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
    writeVisibility(fullKey, value);
  }, [columns, fullKey, isVisible, stored]);

  const reset = useCallback(() => {
    if (fullKey) writeVisibility(fullKey, {});
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
