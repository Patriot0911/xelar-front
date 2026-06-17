import { useMutation, useQueryClient } from '@tanstack/react-query';
import AuthService, { AuthQueryKey } from '@/lib/services/auth.service';
import { IGenericErrorResponseModel } from '@/lib/models/generic-response.model';
import { toast } from 'sonner';

const useUnlinkDiscordMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, IGenericErrorResponseModel, void>({
    mutationFn: AuthService.unlinkDiscord,
    onSuccess: () => {
      toast.success('Discord unlinked');
      queryClient.invalidateQueries({ queryKey: [AuthQueryKey.Me] });
    },
    onError: (err) => {
      toast.error(err.message ?? 'Something went wrong');
    },
  });
};

export default useUnlinkDiscordMutation;
