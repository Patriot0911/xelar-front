import { useMutation, useQueryClient } from '@tanstack/react-query';
import AuthService, { AuthQueryKey } from '@/lib/services/auth.service';
import { ApiError } from '@/lib/errors';
import { toast } from 'sonner';

const useSetTwitchPersonalAuthMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, boolean>({
    mutationFn: AuthService.setTwitchPersonalAuth,
    onSuccess: (_, enabled) => {
      toast.success(enabled ? 'Personal auth enabled' : 'Personal auth disabled');
      queryClient.invalidateQueries({ queryKey: [AuthQueryKey.Me] });
    },
  });
};

export default useSetTwitchPersonalAuthMutation;
