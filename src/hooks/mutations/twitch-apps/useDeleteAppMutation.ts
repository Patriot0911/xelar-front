import { ApiError } from '@/lib/errors';
import TwitchAppService, { TwitchAppsQueryKey } from '@/lib/services/twitch-app.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const useDeleteAppMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<void, ApiError, string>({
    mutationFn: TwitchAppService.deleteTwitchApp,
    onSuccess: () => {
      toast.success('App deleted successfully');
      queryClient.invalidateQueries({ queryKey: [TwitchAppsQueryKey.List] })
    },
  });
};

export default useDeleteAppMutation;
