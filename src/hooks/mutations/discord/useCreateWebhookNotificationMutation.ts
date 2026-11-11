import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import DiscordService, { DiscordQueryKey } from '@/lib/services/discord.service';
import type {
  IWebhookNotificationModel,
  ICreateWebhookNotificationPayload,
} from '@/lib/models/discord';
import { ApiError } from '@/lib/errors';

interface ICreateWebhookArgs {
  guildId: string;
  data: ICreateWebhookNotificationPayload;
}

const useCreateWebhookNotificationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<IWebhookNotificationModel, ApiError, ICreateWebhookArgs>({
    mutationFn: ({ guildId, data }) => DiscordService.createWebhookNotification(guildId, data),
    onSuccess: () => {
      toast.success('Webhook notification created');
      queryClient.invalidateQueries({ queryKey: [DiscordQueryKey.GuildNotifications] });
      queryClient.invalidateQueries({ queryKey: [DiscordQueryKey.MyNotifications] });
    },
  });
};

export default useCreateWebhookNotificationMutation;
