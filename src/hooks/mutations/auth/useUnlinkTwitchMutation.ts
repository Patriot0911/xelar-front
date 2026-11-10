import { useMutation, useQueryClient } from '@tanstack/react-query';
import AuthService, { AuthQueryKey } from '@/lib/services/auth.service';
import { ApiError } from '@/lib/errors';
import { toast } from 'sonner';

const useUnlinkTwitchMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, void>({
    mutationFn: AuthService.unlinkTwitch,
    onSuccess: () => {
      toast.success('Twitch unlinked');
      queryClient.invalidateQueries({ queryKey: [AuthQueryKey.Me] });
    },
  });
};

export default useUnlinkTwitchMutation;
