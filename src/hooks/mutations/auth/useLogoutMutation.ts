import { useMutation } from '@tanstack/react-query';
import { useAppDispatch } from '../../redux';
import AuthService from '@/lib/services/auth.service';
import { logout } from '@/store/slices/authSlice';
import { ApiError } from '@/lib/errors';

const useLogoutMutation = () => {
  const dispatch = useAppDispatch();

  return useMutation<void, ApiError, void>({
    meta: { errorMessage: 'Failed to logout' },
    mutationFn: AuthService.logout,
    onSuccess: () => {
      dispatch(logout());
    },
  });
};

export default useLogoutMutation;
