import { useAppDispatch } from '@/hooks/redux';
import { IAuthMeResponse, IAuthResponseModel } from '@/lib/models/auth';
import AuthService, { AuthQueryKey } from '@/lib/services/auth.service';
import { login, logout } from '@/store/slices/authSlice';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useDiscordCodeMutation = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation<IAuthResponseModel, Error, string>({
    mutationFn: AuthService.discordCallback,
    onSuccess: (data) => {
      dispatch(login(data.tokens));
      queryClient.setQueryData(
        [AuthQueryKey.Me],
        data.user satisfies IAuthMeResponse
      );
    },
    onError: () => {
      dispatch(logout());
    },
  });
};

export default useDiscordCodeMutation;
