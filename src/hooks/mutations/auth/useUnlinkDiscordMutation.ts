import { useMutation, useQueryClient } from '@tanstack/react-query';
import AuthService, { AuthQueryKey } from '@/lib/services/auth.service';
import { ApiError } from '@/lib/errors';
import { toast } from 'sonner';

const useUnlinkDiscordMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, void>({
    mutationFn: AuthService.unlinkDiscord,
    onSuccess: () => {
      toast.success('Discord unlinked');
      queryClient.invalidateQueries({ queryKey: [AuthQueryKey.Me] });
    },
  });
};

export default useUnlinkDiscordMutation;
