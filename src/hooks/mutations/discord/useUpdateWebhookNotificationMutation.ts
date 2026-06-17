import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import DiscordService, { DiscordQueryKey } from '@/lib/services/discord.service';
import type {
  IWebhookNotificationModel,
  IUpdateWebhookNotificationPayload,
} from '@/lib/models/discord';
import { IGenericErrorResponseModel } from '@/lib/models/generic-response.model';

interface IUpdateWebhookArgs {
  id: string;
  data: IUpdateWebhookNotificationPayload;
}

const useUpdateWebhookNotificationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<IWebhookNotificationModel, IGenericErrorResponseModel, IUpdateWebhookArgs>({
    mutationFn: ({ id, data }) => DiscordService.updateWebhookNotification(id, data),
    onSuccess: () => {
      toast.success('Webhook notification updated');
      queryClient.invalidateQueries({ queryKey: [DiscordQueryKey.GuildNotifications] });
      queryClient.invalidateQueries({ queryKey: [DiscordQueryKey.AllNotifications] });
    },
    onError: (err) => {
      toast.error(err.message ?? 'Something went wrong');
    },
  });
};

export default useUpdateWebhookNotificationMutation;
