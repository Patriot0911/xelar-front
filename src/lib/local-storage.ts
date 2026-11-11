/**
 * `localStorage` access for per-browser UI preferences (table columns, favorite servers).
 * Every call is wrapped: storage can throw in private mode or with blocked site data — the UI then
 * just behaves as if nothing was stored. Subscribe with `useSyncExternalStore(subscribeStorage, …)`.
 */

// Same-tab writes don't fire `storage`, so writers notify the subscribers themselves.
const listeners = new Set<() => void>();
const notify = () => listeners.forEach((listener) => listener());

/** Fires on writes from this tab (`writeStorage`) and from other tabs (`storage` event). */
export const subscribeStorage = (listener: () => void) => {
  listeners.add(listener);
  window.addEventListener('storage', listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', listener);
  };
};

export const readStorage = (key: string): string | null => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

/** `null` removes the key. */
export const writeStorage = (key: string, value: string | null) => {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch {
    // Not persisted — the choice is lost on reload, nothing else breaks.
  }
  notify();
};
