import { useAppDispatch } from '@/hooks/redux';
import { IAuthMeResponse, IAuthResponseModel, ILoginByEmailModel } from '@/lib/models/auth';
import { IGenericErrorResponseModel } from '@/lib/models/generic-response.model';
import AuthService, { AuthQueryKey } from '@/lib/services/auth.service';
import { login } from '@/store/slices/authSlice';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useLoginByEmailMutation = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation<IAuthResponseModel, IGenericErrorResponseModel, ILoginByEmailModel>({
    mutationFn: AuthService.loginByEmail,
    onSuccess: (data) => {
      dispatch(login(data.tokens));
      queryClient.setQueryData(
        [AuthQueryKey.Me],
        data.user satisfies IAuthMeResponse
      );
    },
  });
};

export default useLoginByEmailMutation;
