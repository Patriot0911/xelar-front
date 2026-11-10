import { useAppSelector } from '@/hooks/redux';
import { authSelector } from '@/hooks/redux/auth';
import { ISessionModel } from '@/lib/models/auth';
import AuthService, { AuthQueryKey } from '@/lib/services/auth.service';
import { useQuery } from '@tanstack/react-query';

const useSessionsQuery = () => {
  const { status } = useAppSelector(authSelector);

  return useQuery<ISessionModel[], Error, ISessionModel[]>({
    // Auxiliary data: a failure must not replace the page, so it is reported as a toast.
    meta: { errorMode: 'toast' },
    queryKey: [AuthQueryKey.Sessions],
    queryFn: AuthService.getSessions,
    retry: false,
    enabled: status === 'authenticated',
  });
};

export default useSessionsQuery;
