import axios, { AxiosError } from 'axios';
import { API_ERROR_MESSAGES, ApiErrorKind } from '@/lib/constants/errors';

interface IApiErrorOptions {
  kind: ApiErrorKind;
  /** User-facing text. Defaults to the message for `kind`. */
  message?: string;
  status?: number;
  /** Machine-readable code from the backend (`data` when it is a string). */
  code?: string;
  /** Raw details for logging: validation messages, schema issues, backend payload. */
  details?: unknown;
  /** True when `message` came from the backend and is safe to show as is. */
  fromServer?: boolean;
}

/**
 * The single error type every request rejects with. `message` is always safe to show to the user;
 * anything technical lives in `details`.
 */
export class ApiError extends Error {
  readonly kind: ApiErrorKind;
  readonly status?: number;
  readonly code?: string;
  readonly details?: unknown;
  readonly fromServer: boolean;

  constructor({ kind, message, status, code, details, fromServer = false }: IApiErrorOptions) {
    super(message || API_ERROR_MESSAGES[kind]);
    this.name = 'ApiError';
    this.kind = kind;
    this.status = status;
    this.code = code;
    this.details = details;
    this.fromServer = fromServer;
  }
}

export const isApiError = (error: unknown): error is ApiError => error instanceof ApiError;

interface IServerErrorBody {
  message?: unknown;
  data?: unknown;
}

// Nest's default body for a route that does not exist ("Cannot GET /api/…"): the client is ahead of the server.
const MISSING_ROUTE_PATTERN = /^Cannot (GET|POST|PUT|PATCH|DELETE) /;

const kindFromStatus = (status: number): ApiErrorKind => {
  if (status === 401) return ApiErrorKind.Unauthorized;
  if (status === 403) return ApiErrorKind.Forbidden;
  if (status === 404) return ApiErrorKind.NotFound;
  if (status === 400 || status === 422) return ApiErrorKind.Validation;
  if (status >= 500) return ApiErrorKind.Server;
  if (status >= 400) return ApiErrorKind.Business;
  return ApiErrorKind.Unknown;
};

const fromResponse = (status: number, body: IServerErrorBody | undefined): ApiError => {
  const rawMessage = body?.message;
  const code = typeof body?.data === 'string' ? body.data : undefined;

  if (status === 404 && typeof rawMessage === 'string' && MISSING_ROUTE_PATTERN.test(rawMessage)) {
    return new ApiError({ kind: ApiErrorKind.Contract, status, details: rawMessage });
  }

  let kind = kindFromStatus(status);

  // class-validator sends an array of messages; a plain 400 string is a business rule ("Insufficient balance").
  if (kind === ApiErrorKind.Validation && typeof rawMessage === 'string') {
    kind = ApiErrorKind.Business;
  }

  const serverMessage = Array.isArray(rawMessage)
    ? rawMessage.filter((item): item is string => typeof item === 'string')[0]
    : typeof rawMessage === 'string' ? rawMessage : undefined;

  // Only client errors carry messages meant for people; 5xx text is internal.
  const canShowServerMessage = status < 500 && kind !== ApiErrorKind.Unauthorized && Boolean(serverMessage);

  return new ApiError({
    kind,
    status,
    code,
    message: canShowServerMessage ? serverMessage : undefined,
    fromServer: canShowServerMessage,
    details: body,
  });
};

/** Converts anything thrown by axios (or our own code) into an `ApiError`. */
export const toApiError = (error: unknown): ApiError => {
  if (isApiError(error)) return error;

  if (axios.isCancel(error)) {
    return new ApiError({ kind: ApiErrorKind.Canceled, code: 'ERR_CANCELED' });
  }

  if (error instanceof AxiosError) {
    if (error.response) {
      return fromResponse(error.response.status, error.response.data as IServerErrorBody | undefined);
    }
    if (error.request) {
      return new ApiError({ kind: ApiErrorKind.Network, details: error.message });
    }
  }

  return new ApiError({
    kind: ApiErrorKind.Unknown,
    details: error instanceof Error ? error.message : error,
  });
};

/**
 * Text for a toast or inline message. A specific server message wins; otherwise the caller's
 * fallback (e.g. "Failed to update balance"); otherwise the generic text for the error kind.
 */
export const getErrorMessage = (error: unknown, fallback?: string): string => {
  const apiError = toApiError(error);
  if (apiError.fromServer) return apiError.message;
  return fallback ?? apiError.message;
};

/** Network hiccups and 5xx may succeed on a second try; client errors and contract mismatches will not. */
export const isRetryableError = (error: unknown): boolean => {
  const { kind } = toApiError(error);
  return kind === ApiErrorKind.Network || kind === ApiErrorKind.Server;
};
