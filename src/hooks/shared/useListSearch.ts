import { useEffect, useState } from 'react';
import useDebouncedValue from './useDebouncedValue';

export const SEARCH_DEBOUNCE_MS = 300;

/**
 * Search state for a paginated list: `value` drives the input, `search` (debounced, trimmed,
 * `undefined` when empty) goes into the query params. `onSearchChange` runs when the debounced term
 * changes — pass the page reset there so a new search always starts from page 1.
 */
const useListSearch = (onSearchChange?: () => void) => {
  const [value, setValue] = useState('');
  const debounced = useDebouncedValue(value.trim(), SEARCH_DEBOUNCE_MS);
  const search = debounced || undefined;

  useEffect(() => {
    onSearchChange?.();
    // Runs only when the debounced term changes, not when the callback identity does.
  }, [search]);

  return { value, setValue, search };
};

export default useListSearch;
