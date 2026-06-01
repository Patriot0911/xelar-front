import { IGenericErrorResponseModel } from '@/lib/models/generic-response.model';
import { ICreateTwitchAppModel, ITwitchAppShortModel } from '@/lib/models/twitch/twitch-app.model';
import TwitchAppService, { TwitchAppsQueryKey } from '@/lib/services/twitch-app.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const useCreateAppMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<ITwitchAppShortModel, IGenericErrorResponseModel, ICreateTwitchAppModel>({
    mutationFn: TwitchAppService.createTwitchApp,
    onSuccess: () => {
      toast.success('App added successfully');
      queryClient.invalidateQueries({ queryKey: [TwitchAppsQueryKey.List] })
    },
    onError: (err) => {
      toast.error(err.message ?? 'Something went wrong');
    },
  });
};

export default useCreateAppMutation;
