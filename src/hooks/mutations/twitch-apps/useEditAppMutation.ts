import { IGenericErrorResponseModel } from '@/lib/models/generic-response.model';
import { IEditTwitchAppModel, ITwitchAppShortModel } from '@/lib/models/twitch/twitch-app.model';
import TwitchAppService from '@/lib/services/twitch-app.service';
import { useMutation } from '@tanstack/react-query';

const useEditAppMutation = () => {
  return useMutation<ITwitchAppShortModel, IGenericErrorResponseModel, IEditTwitchAppModel>({
    mutationFn: TwitchAppService.editTwitchApp,
    onSuccess: (data) => {
      console.log({ data })
    },
  });
};

export default useEditAppMutation;
