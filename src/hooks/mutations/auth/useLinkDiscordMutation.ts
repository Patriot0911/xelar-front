import { useMutation, useQueryClient } from '@tanstack/react-query';
import AuthService, { AuthQueryKey } from '@/lib/services/auth.service';
import { ApiError } from '@/lib/errors';
import { toast } from 'sonner';

const useLinkDiscordMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, string>({
    meta: { errorMode: 'silent' },
    mutationFn: AuthService.linkDiscord,
    onSuccess: () => {
      toast.success('Discord linked');
      queryClient.invalidateQueries({ queryKey: [AuthQueryKey.Me] });
    },
  });
};

export default useLinkDiscordMutation;
