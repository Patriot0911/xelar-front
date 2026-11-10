import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import TwitchSubscriptionService, { TwitchSubscriptionQueryKey } from '@/lib/services/twitch-subscription.service';
import { ApiError } from '@/lib/errors';

const useDeleteLocalSubscriptionMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<void, ApiError, string>({
    mutationFn: TwitchSubscriptionService.deleteLocalSubscription,
    onSuccess: () => {
      toast.success('Subscription deleted');
      queryClient.invalidateQueries({ queryKey: [TwitchSubscriptionQueryKey.LocalList] });
    },
  });
};

export default useDeleteLocalSubscriptionMutation;
