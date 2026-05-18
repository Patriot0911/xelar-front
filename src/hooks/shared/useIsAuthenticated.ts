import { useAppSelector } from '../redux';
import { authStatusSelector } from '../redux/auth';

export const useIsAuthenticated = () => {
  const status = useAppSelector(authStatusSelector);

  return status !== 'guest';
};
