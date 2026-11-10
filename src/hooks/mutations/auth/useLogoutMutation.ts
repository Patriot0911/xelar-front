import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppDispatch } from '../../redux';
import AuthService from '@/lib/services/auth.service';
import { logout } from '@/store/slices/authSlice';
import { ApiError } from '@/lib/errors';

const useLogoutMutation = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, void>({
    meta: { errorMessage: 'Failed to logout' },
    mutationFn: AuthService.logout,
    // End the local session even if the server call fails (e.g. expired
    // token), otherwise the user would be stuck signed in.
    onSettled: () => {
      dispatch(logout());
      queryClient.clear();
    },
  });
};

export default useLogoutMutation;
