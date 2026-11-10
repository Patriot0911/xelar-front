import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  ApiError,
  IMutationMeta,
  IQueryMeta,
  getErrorMessage,
  isHandledElsewhere,
  isRetryableError,
  shouldThrowQueryError,
  shouldToastQueryError,
  toApiError,
} from '@/lib/errors';

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: ApiError;
    queryMeta: IQueryMeta;
    mutationMeta: IMutationMeta;
  }
}

const MAX_RETRIES = 2;

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (!shouldToastQueryError(error, query)) return;
      // One toast per error kind: when the backend is down, five failing queries show one message.
      toast.error(getErrorMessage(error, query.meta?.errorMessage), { id: `query-${toApiError(error).kind}` });
    },
  }),
  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      if (mutation.meta?.errorMode === 'silent' || isHandledElsewhere(error)) return;
      toast.error(getErrorMessage(error, mutation.meta?.errorMessage));
    },
  }),
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: (failureCount, error) => isRetryableError(error) && failureCount < MAX_RETRIES,
      throwOnError: shouldThrowQueryError,
    },
    mutations: {
      retry: false,
    },
  },
});
