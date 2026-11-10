import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import DiscordService, { DiscordQueryKey } from '@/lib/services/discord.service';
import type {
  IDiscordBotNotificationModel,
  ICreateDiscordNotificationPayload,
} from '@/lib/models/discord';
import { ApiError } from '@/lib/errors';

const useCreateDiscordNotificationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<IDiscordBotNotificationModel, ApiError, ICreateDiscordNotificationPayload>({
    mutationFn: DiscordService.createDiscordNotification,
    onSuccess: () => {
      toast.success('Notification created');
      queryClient.invalidateQueries({ queryKey: [DiscordQueryKey.GuildNotifications] });
      queryClient.invalidateQueries({ queryKey: [DiscordQueryKey.AllNotifications] });
    },
  });
};

export default useCreateDiscordNotificationMutation;
