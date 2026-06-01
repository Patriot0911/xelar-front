import { useMutation, useQueryClient } from '@tanstack/react-query';
import DiscordService, { DiscordQueryKey } from '@/lib/services/discord.service';
import type {
  IWebhookNotificationModel,
  ICreateWebhookNotificationPayload,
} from '@/lib/models/discord';

interface ICreateWebhookArgs {
  guildId: string;
  data: ICreateWebhookNotificationPayload;
}

const useCreateWebhookNotificationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<IWebhookNotificationModel, Error, ICreateWebhookArgs>({
    mutationFn: ({ guildId, data }) => DiscordService.createWebhookNotification(guildId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DiscordQueryKey.GuildNotifications] });
      queryClient.invalidateQueries({ queryKey: [DiscordQueryKey.AllNotifications] });
    },
  });
};

export default useCreateWebhookNotificationMutation;
