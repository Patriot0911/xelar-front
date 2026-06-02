import { useAppDispatch } from '@/hooks/redux';
import { IAuthMeResponse, IAuthResponseModel, IRegisterByEmailModel } from '@/lib/models/auth';
import { IGenericErrorResponseModel } from '@/lib/models/generic-response.model';
import AuthService, { AuthQueryKey } from '@/lib/services/auth.service';
import { login } from '@/store/slices/authSlice';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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
  });
};

export default useRegisterByEmailMutation;
