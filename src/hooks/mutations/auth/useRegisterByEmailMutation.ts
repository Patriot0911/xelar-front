import { useAppDispatch } from '@/hooks/redux';
import { IAuthMeResponse, IAuthResponseModel, IRegisterByEmailModel } from '@/lib/models/auth';
import { IGenericErrorResponseModel } from '@/lib/models/generic-response.model';
import AuthService, { AuthQueryKey } from '@/lib/services/auth.service';
import { login } from '@/store/slices/authSlice';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const useRegisterByEmailMutation = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation<IAuthResponseModel, IGenericErrorResponseModel, IRegisterByEmailModel>({
    mutationFn: AuthService.registerByEmail,
    onSuccess: (data) => {
      dispatch(login(data.tokens));
      queryClient.setQueryData(
        [AuthQueryKey.Me],
        data.user satisfies IAuthMeResponse
      );
    },
    onError: (err) => {
      toast.error(err.message ?? 'Something went wrong');
    },
  });
};

export default useRegisterByEmailMutation;
