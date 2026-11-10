import { z } from 'zod';
import { ApiErrorKind } from '@/lib/constants/errors';
import type { IGenericList } from '@/lib/models/generic-response.model';
import { ApiError } from './api-error';

/**
 * Response-shape checks used inside service functions (i.e. inside `queryFn`).
 * A mismatch — typically a client deployed ahead of the API — becomes an `ApiError` of kind
 * `contract`, so TanStack Query treats it as a failed request instead of the page crashing
 * later on `undefined.items`.
 *
 * These check the envelope only; add item schemas with `parseResponse` where it matters.
 */

const listSchema = z.object({
  items: z.array(z.unknown()),
  meta: z.object({ count: z.number() }),
});

const arraySchema = z.array(z.unknown());

const objectSchema = z.record(z.string(), z.unknown());

export const parseResponse = <T>(schema: z.ZodType<T>, data: unknown, endpoint: string): T => {
  const result = schema.safeParse(data);

  if (!result.success) {
    const details = { endpoint, issues: result.error.issues };
    console.error('[contract] Unexpected API response', details);
    throw new ApiError({ kind: ApiErrorKind.Contract, details });
  }

  return result.data;
};

/** `{ items: T[], meta: { count } }` — usage: `apiClient.get(url).then(expectList<IUsersListResponse>(url))` */
export const expectList = <T extends IGenericList<unknown>>(endpoint: string) => (data: unknown): T =>
  parseResponse(listSchema, data, endpoint) as T;

/** `T[]` */
export const expectArray = <T extends unknown[]>(endpoint: string) => (data: unknown): T =>
  parseResponse(arraySchema, data, endpoint) as T;

/** A non-null object (entity responses). */
export const expectObject = <T>(endpoint: string) => (data: unknown): T =>
  parseResponse(objectSchema, data, endpoint) as T;
