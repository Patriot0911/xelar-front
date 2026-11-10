import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import TwitchSubscriptionService, { TwitchSubscriptionQueryKey } from '@/lib/services/twitch-subscription.service';
import { IDeleteTwitchSubscriptionPayload } from '@/lib/models/twitch/twitch-subscription.model';
import { ApiError } from '@/lib/errors';

const useDeleteTwitchSubscriptionMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<void, ApiError, IDeleteTwitchSubscriptionPayload>({
    mutationFn: TwitchSubscriptionService.deleteTwitchSubscription,
    onSuccess: () => {
      toast.success('Twitch subscription revoked');
      queryClient.invalidateQueries({ queryKey: [TwitchSubscriptionQueryKey.RawList] });
    },
  });
};

export default useDeleteTwitchSubscriptionMutation;
