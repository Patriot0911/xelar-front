import { useMutation, useQueryClient } from '@tanstack/react-query';
import AuthService, { AuthQueryKey } from '@/lib/services/auth.service';
import { IGenericErrorResponseModel } from '@/lib/models/generic-response.model';
import { toast } from 'sonner';

const useLinkDiscordMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, IGenericErrorResponseModel, string>({
    mutationFn: AuthService.linkDiscord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [AuthQueryKey.Me] });
    },
    onError: (err) => {
      toast.error(err.message ?? 'Something went wrong');
    },
  });
};

export default useLinkDiscordMutation;
