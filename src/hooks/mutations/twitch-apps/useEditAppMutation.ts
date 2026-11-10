import { ApiError } from '@/lib/errors';
import { IEditTwitchAppModel, ITwitchAppShortModel } from '@/lib/models/twitch/twitch-app.model';
import TwitchAppService, { TwitchAppsQueryKey } from '@/lib/services/twitch-app.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const useEditAppMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<ITwitchAppShortModel, ApiError, IEditTwitchAppModel>({
    mutationFn: TwitchAppService.editTwitchApp,
    onSuccess: () => {
      toast.success('App edited successfully');
      queryClient.invalidateQueries({ queryKey: [TwitchAppsQueryKey.List] })
      queryClient.invalidateQueries({ queryKey: [TwitchAppsQueryKey.Selected] })
    },
  });
};

export default useEditAppMutation;
