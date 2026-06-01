import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import TwitchSubscriptionService, { TwitchSubscriptionQueryKey } from '@/lib/services/twitch-subscription.service';
import { IDeleteTwitchSubscriptionPayload } from '@/lib/models/twitch/twitch-subscription.model';
import { IGenericErrorResponseModel } from '@/lib/models/generic-response.model';

const useDeleteTwitchSubscriptionMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<void, IGenericErrorResponseModel, IDeleteTwitchSubscriptionPayload>({
    mutationFn: TwitchSubscriptionService.deleteTwitchSubscription,
    onSuccess: () => {
      toast.success('Twitch subscription revoked');
      queryClient.invalidateQueries({ queryKey: [TwitchSubscriptionQueryKey.RawList] });
    },
    onError: (err) => {
      toast.error(err.message ?? 'Something went wrong');
    },
  });
};

export default useDeleteTwitchSubscriptionMutation;
