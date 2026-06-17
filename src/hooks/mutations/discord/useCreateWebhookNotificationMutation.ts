import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import DiscordService, { DiscordQueryKey } from '@/lib/services/discord.service';
import type {
  IWebhookNotificationModel,
  ICreateWebhookNotificationPayload,
} from '@/lib/models/discord';
import { IGenericErrorResponseModel } from '@/lib/models/generic-response.model';

interface ICreateWebhookArgs {
  guildId: string;
  data: ICreateWebhookNotificationPayload;
}

const useCreateWebhookNotificationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<IWebhookNotificationModel, IGenericErrorResponseModel, ICreateWebhookArgs>({
    mutationFn: ({ guildId, data }) => DiscordService.createWebhookNotification(guildId, data),
    onSuccess: () => {
      toast.success('Webhook notification created');
      queryClient.invalidateQueries({ queryKey: [DiscordQueryKey.GuildNotifications] });
      queryClient.invalidateQueries({ queryKey: [DiscordQueryKey.AllNotifications] });
    },
    onError: (err) => {
      toast.error(err.message ?? 'Something went wrong');
    },
  });
};

export default useCreateWebhookNotificationMutation;
