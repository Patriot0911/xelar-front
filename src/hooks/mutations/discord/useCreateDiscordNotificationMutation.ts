import { useMutation, useQueryClient } from '@tanstack/react-query';
import DiscordService, { DiscordQueryKey } from '@/lib/services/discord.service';
import type {
  IDiscordBotNotificationModel,
  ICreateDiscordNotificationPayload,
} from '@/lib/models/discord';

const useCreateDiscordNotificationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<IDiscordBotNotificationModel, Error, ICreateDiscordNotificationPayload>({
    mutationFn: DiscordService.createDiscordNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DiscordQueryKey.GuildNotifications] });
      queryClient.invalidateQueries({ queryKey: [DiscordQueryKey.AllNotifications] });
    },
  });
};

export default useCreateDiscordNotificationMutation;
