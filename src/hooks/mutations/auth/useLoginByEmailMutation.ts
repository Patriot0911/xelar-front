import { useAppDispatch } from '@/hooks/redux';
import { IAuthMeResponse, IAuthResponseModel, ILoginByEmailModel } from '@/lib/models/auth';
import { ApiError } from '@/lib/errors';
import AuthService, { AuthQueryKey } from '@/lib/services/auth.service';
import { login } from '@/store/slices/authSlice';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useLoginByEmailMutation = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation<IAuthResponseModel, ApiError, ILoginByEmailModel>({
    meta: { errorMode: 'silent' },
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
