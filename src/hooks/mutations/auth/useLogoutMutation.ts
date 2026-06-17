import { useMutation } from '@tanstack/react-query';
import { useAppDispatch } from '../../redux';
import AuthService from '@/lib/services/auth.service';
import { logout } from '@/store/slices/authSlice';
import { IGenericErrorResponseModel } from '@/lib/models/generic-response.model';
import { toast } from 'sonner';

const useLogoutMutation = () => {
  const dispatch = useAppDispatch();

  return useMutation<void, IGenericErrorResponseModel, void>({
    mutationFn: AuthService.logout,
    onSuccess: () => {
      dispatch(logout());
    },
    onError: (err) => {
      toast.error(err.message ?? 'Failed to logout');
    },
  });
};

export default useLogoutMutation;
