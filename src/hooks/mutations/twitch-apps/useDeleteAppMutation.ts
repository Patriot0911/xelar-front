import { IGenericErrorResponseModel } from '@/lib/models/generic-response.model';
import TwitchAppService, { TwitchAppsQueryKey } from '@/lib/services/twitch-app.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const useDeleteAppMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<void, IGenericErrorResponseModel, string>({
    mutationFn: TwitchAppService.deleteTwitchApp,
    onSuccess: () => {
      toast.success('App deleted successfully');
      queryClient.invalidateQueries({ queryKey: [TwitchAppsQueryKey.List] })
    },
    onError: (err) => {
      toast.error(err.message ?? 'Something went wrong');
    },
  });
};

export default useDeleteAppMutation;
