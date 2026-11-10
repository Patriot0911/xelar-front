import { ApiError } from '@/lib/errors';
import { ICreateTwitchAppModel, ITwitchAppShortModel } from '@/lib/models/twitch/twitch-app.model';
import TwitchAppService, { TwitchAppsQueryKey } from '@/lib/services/twitch-app.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const useCreateAppMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<ITwitchAppShortModel, ApiError, ICreateTwitchAppModel>({
    mutationFn: TwitchAppService.createTwitchApp,
    onSuccess: () => {
      toast.success('App added successfully');
      queryClient.invalidateQueries({ queryKey: [TwitchAppsQueryKey.List] })
    },
  });
};

export default useCreateAppMutation;
