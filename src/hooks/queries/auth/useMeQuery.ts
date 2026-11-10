import { useAppSelector } from '@/hooks/redux';
import { authSelector } from '@/hooks/redux/auth';
import { IAuthMeResponse } from '@/lib/models/auth';
import AuthService, { AuthQueryKey } from '@/lib/services/auth.service';
import { useQuery } from '@tanstack/react-query';

const useMeQuery = () => {
  const { status, } = useAppSelector(authSelector);

  return useQuery<IAuthMeResponse, Error, IAuthMeResponse>({
    // Auxiliary data: a failure must not replace the page, so it is reported as a toast.
    meta: { errorMode: 'toast' },
    queryKey: [AuthQueryKey.Me],
    queryFn: AuthService.getMeUser,
    retry: false,
    enabled: status === 'authenticated',
  });
}

export default useMeQuery;
