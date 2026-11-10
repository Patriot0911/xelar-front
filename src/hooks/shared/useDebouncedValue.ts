import { useEffect, useState } from 'react';

/** Returns `value` once it has stopped changing for `delay` ms (e.g. to send a search request per pause, not per key). */
const useDebouncedValue = <T,>(value: T, delay = 300): T => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
};

export default useDebouncedValue;
