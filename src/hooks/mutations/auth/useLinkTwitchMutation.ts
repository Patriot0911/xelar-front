import { useMutation, useQueryClient } from '@tanstack/react-query';
import AuthService, { AuthQueryKey } from '@/lib/services/auth.service';
import { ApiError } from '@/lib/errors';
import { toast } from 'sonner';

const useLinkTwitchMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, string>({
    meta: { errorMode: 'silent' },
    mutationFn: AuthService.linkTwitch,
    onSuccess: () => {
      toast.success('Twitch linked');
      queryClient.invalidateQueries({ queryKey: [AuthQueryKey.Me] });
    },
  });
};

export default useLinkTwitchMutation;
