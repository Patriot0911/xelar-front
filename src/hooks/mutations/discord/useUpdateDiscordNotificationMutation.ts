import { useMutation, useQueryClient } from '@tanstack/react-query';
import DiscordService, { DiscordQueryKey } from '@/lib/services/discord.service';
import type {
  IDiscordBotNotificationModel,
  IUpdateDiscordNotificationPayload,
} from '@/lib/models/discord';

interface IUpdateDiscordArgs {
  id: string;
  data: IUpdateDiscordNotificationPayload;
}

const useUpdateDiscordNotificationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<IDiscordBotNotificationModel, Error, IUpdateDiscordArgs>({
    mutationFn: ({ id, data }) => DiscordService.updateDiscordNotification(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DiscordQueryKey.GuildNotifications] });
      queryClient.invalidateQueries({ queryKey: [DiscordQueryKey.AllNotifications] });
    },
  });
};

export default useUpdateDiscordNotificationMutation;
