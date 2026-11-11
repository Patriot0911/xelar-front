import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import DiscordService, { DiscordQueryKey } from '@/lib/services/discord.service';
import type {
  IWebhookNotificationModel,
  IUpdateWebhookNotificationPayload,
} from '@/lib/models/discord';
import { ApiError } from '@/lib/errors';

interface IUpdateWebhookArgs {
  id: string;
  data: IUpdateWebhookNotificationPayload;
}

const useUpdateWebhookNotificationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<IWebhookNotificationModel, ApiError, IUpdateWebhookArgs>({
    mutationFn: ({ id, data }) => DiscordService.updateWebhookNotification(id, data),
    onSuccess: () => {
      toast.success('Webhook notification updated');
      queryClient.invalidateQueries({ queryKey: [DiscordQueryKey.GuildNotifications] });
      queryClient.invalidateQueries({ queryKey: [DiscordQueryKey.MyNotifications] });
    },
  });
};

export default useUpdateWebhookNotificationMutation;
