import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import TwitchSubscriptionService, { TwitchSubscriptionQueryKey } from '@/lib/services/twitch-subscription.service';
import { IGenericErrorResponseModel } from '@/lib/models/generic-response.model';

const useDeleteLocalSubscriptionMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<void, IGenericErrorResponseModel, string>({
    mutationFn: TwitchSubscriptionService.deleteLocalSubscription,
    onSuccess: () => {
      toast.success('Subscription deleted');
      queryClient.invalidateQueries({ queryKey: [TwitchSubscriptionQueryKey.LocalList] });
    },
    onError: (err) => {
      toast.error(err.message ?? 'Something went wrong');
    },
  });
};

export default useDeleteLocalSubscriptionMutation;
