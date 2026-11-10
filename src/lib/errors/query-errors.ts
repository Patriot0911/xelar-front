import { ApiErrorKind, DISCORD_AUTH_ERROR_CODES } from '@/lib/constants/errors';
import { toApiError } from './api-error';

/**
 * How a query reports a failure.
 * - `boundary` (default) — a failed first load is thrown to the nearest error boundary;
 *   a failed background refetch (data already on screen) shows a toast.
 * - `toast` — never thrown; always a toast. For auxiliary data (modals, shell widgets, cells).
 * - `silent` — never thrown, no toast; the component renders `error` itself.
 */
export type QueryErrorMode = 'boundary' | 'toast' | 'silent';

export interface IQueryMeta extends Record<string, unknown> {
  errorMode?: QueryErrorMode;
  /** Fallback toast text when the server sends no specific message. */
  errorMessage?: string;
}

export interface IMutationMeta extends Record<string, unknown> {
  /** `silent` when the component shows the error inline instead of a toast. */
  errorMode?: 'toast' | 'silent';
  errorMessage?: string;
}

/** Errors that have their own handling elsewhere and must never reach a boundary or a toast. */
export const isHandledElsewhere = (error: unknown): boolean => {
  const apiError = toApiError(error);
  if (apiError.kind === ApiErrorKind.Unauthorized) return true; // api-client refreshes the token or logs out
  if (apiError.kind === ApiErrorKind.Canceled) return true;
  return isDiscordAuthError(apiError);
};

export const isDiscordAuthError = (error: unknown): boolean => {
  const { code } = toApiError(error);
  return Boolean(code && (DISCORD_AUTH_ERROR_CODES as readonly string[]).includes(code));
};

/** The two query fields the policy needs; structural so it fits any `Query<…>` generic. */
interface IQueryLike {
  state: { data: unknown };
  meta?: Record<string, unknown>;
}

const getMode = (query: IQueryLike): QueryErrorMode =>
  (query.meta as IQueryMeta | undefined)?.errorMode ?? 'boundary';

/** `throwOnError` default: only a failed first load in `boundary` mode goes to the boundary. */
export const shouldThrowQueryError = (error: unknown, query: IQueryLike): boolean =>
  getMode(query) === 'boundary' && query.state.data === undefined && !isHandledElsewhere(error);

/** Mirrors `shouldThrowQueryError`: toast exactly when the error is not rendered by a boundary. */
export const shouldToastQueryError = (error: unknown, query: IQueryLike): boolean => {
  const mode = getMode(query);
  if (mode === 'silent' || isHandledElsewhere(error)) return false;
  if (mode === 'toast') return true;
  return query.state.data !== undefined;
};
