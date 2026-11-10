import { useAppDispatch } from '@/hooks/redux';
import { IAuthMeResponse, IAuthResponseModel, IRegisterByEmailModel } from '@/lib/models/auth';
import { ApiError } from '@/lib/errors';
import AuthService, { AuthQueryKey } from '@/lib/services/auth.service';
import { login } from '@/store/slices/authSlice';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useRegisterByEmailMutation = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation<IAuthResponseModel, ApiError, IRegisterByEmailModel>({
    meta: { errorMode: 'silent' },
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
