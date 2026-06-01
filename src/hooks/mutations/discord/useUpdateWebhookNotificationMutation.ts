import { useMutation, useQueryClient } from '@tanstack/react-query';
import DiscordService, { DiscordQueryKey } from '@/lib/services/discord.service';
import type {
  IWebhookNotificationModel,
  IUpdateWebhookNotificationPayload,
} from '@/lib/models/discord';

interface IUpdateWebhookArgs {
  id: string;
  data: IUpdateWebhookNotificationPayload;
}

const useUpdateWebhookNotificationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<IWebhookNotificationModel, Error, IUpdateWebhookArgs>({
    mutationFn: ({ id, data }) => DiscordService.updateWebhookNotification(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DiscordQueryKey.GuildNotifications] });
      queryClient.invalidateQueries({ queryKey: [DiscordQueryKey.AllNotifications] });
    },
  });
};

export default useUpdateWebhookNotificationMutation;
