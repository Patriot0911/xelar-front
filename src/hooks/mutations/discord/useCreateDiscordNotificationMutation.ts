import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import DiscordService, { DiscordQueryKey } from '@/lib/services/discord.service';
import type {
  IDiscordBotNotificationModel,
  ICreateDiscordNotificationPayload,
} from '@/lib/models/discord';
import { IGenericErrorResponseModel } from '@/lib/models/generic-response.model';

const useCreateDiscordNotificationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<IDiscordBotNotificationModel, IGenericErrorResponseModel, ICreateDiscordNotificationPayload>({
    mutationFn: DiscordService.createDiscordNotification,
    onSuccess: () => {
      toast.success('Notification created');
      queryClient.invalidateQueries({ queryKey: [DiscordQueryKey.GuildNotifications] });
      queryClient.invalidateQueries({ queryKey: [DiscordQueryKey.AllNotifications] });
    },
    onError: (err) => {
      toast.error(err.message ?? 'Something went wrong');
    },
  });
};

export default useCreateDiscordNotificationMutation;
