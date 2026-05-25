import { IGenericErrorResponseModel } from '@/lib/models/generic-response.model';
import { ICreateTwitchAppModel, ITwitchAppShortModel } from '@/lib/models/twitch/twitch-app.model';
import TwitchAppService from '@/lib/services/twitch-app.service';
import { useMutation } from '@tanstack/react-query';

const useCreateAppMutation = () => {
  return useMutation<ITwitchAppShortModel, IGenericErrorResponseModel, ICreateTwitchAppModel>({
    mutationFn: TwitchAppService.createTwitchApp,
    onSuccess: (data) => {
      console.log({ data })
    },
  });
};

export default useCreateAppMutation;
