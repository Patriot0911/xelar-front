import { useQuery } from '@tanstack/react-query';
import { authApi } from '@/lib/api/auth.api';
import { useAppSelector } from '@/store/hooks';

export const ME_QUERY_KEY = ['auth', 'me'] as const;

export function useMe() {
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated);

  return useQuery({
    queryKey: ME_QUERY_KEY,
    queryFn: authApi.me,
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
}
