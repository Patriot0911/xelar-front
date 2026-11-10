export enum ApiErrorKind {
  Network = 'network',
  /** The request was aborted on purpose (AbortController, unmount). Never shown. */
  Canceled = 'canceled',
  Unauthorized = 'unauthorized',
  Forbidden = 'forbidden',
  NotFound = 'not_found',
  Validation = 'validation',
  Business = 'business',
  Server = 'server',
  /** The server answered, but not in the shape this client expects (e.g. an older API version). */
  Contract = 'contract',
  Unknown = 'unknown',
}

/** Default user-facing message per kind; used whenever the server did not send a safe one. */
export const API_ERROR_MESSAGES: Record<ApiErrorKind, string> = {
  [ApiErrorKind.Network]: 'Can’t reach the server. Check your connection and try again.',
  [ApiErrorKind.Canceled]: 'The request was canceled.',
  [ApiErrorKind.Unauthorized]: 'Your session has expired. Please sign in again.',
  [ApiErrorKind.Forbidden]: 'You don’t have permission to do this.',
  [ApiErrorKind.NotFound]: 'We couldn’t find what you were looking for.',
  [ApiErrorKind.Validation]: 'Some of the data is invalid. Please check it and try again.',
  [ApiErrorKind.Business]: 'This action can’t be completed right now.',
  [ApiErrorKind.Server]: 'Something went wrong on our side. Please try again in a moment.',
  [ApiErrorKind.Contract]: 'The server returned data this page doesn’t understand. Try refreshing — the service may be updating.',
  [ApiErrorKind.Unknown]: 'Something went wrong. Please try again.',
};

/** Headings for full error states (boundaries, `ErrorState`). */
export const API_ERROR_TITLES: Record<ApiErrorKind, string> = {
  [ApiErrorKind.Network]: 'You’re offline',
  [ApiErrorKind.Canceled]: 'Request canceled',
  [ApiErrorKind.Unauthorized]: 'Session expired',
  [ApiErrorKind.Forbidden]: 'Access denied',
  [ApiErrorKind.NotFound]: 'Not found',
  [ApiErrorKind.Validation]: 'Invalid data',
  [ApiErrorKind.Business]: 'Action unavailable',
  [ApiErrorKind.Server]: 'Server error',
  [ApiErrorKind.Contract]: 'Unexpected response',
  [ApiErrorKind.Unknown]: 'Something went wrong',
};

/** Backend error codes (sent in `data`) that features handle with their own UI. */
export const DISCORD_AUTH_ERROR_CODES = ['DISCORD_NOT_CONNECTED', 'DISCORD_TOKEN_REVOKED'] as const;
