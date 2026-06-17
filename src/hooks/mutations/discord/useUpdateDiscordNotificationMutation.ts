import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import DiscordService, { DiscordQueryKey } from '@/lib/services/discord.service';
import type {
  IDiscordBotNotificationModel,
  IUpdateDiscordNotificationPayload,
} from '@/lib/models/discord';
import { IGenericErrorResponseModel } from '@/lib/models/generic-response.model';

interface IUpdateDiscordArgs {
  id: string;
  data: IUpdateDiscordNotificationPayload;
}

const useUpdateDiscordNotificationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<IDiscordBotNotificationModel, IGenericErrorResponseModel, IUpdateDiscordArgs>({
    mutationFn: ({ id, data }) => DiscordService.updateDiscordNotification(id, data),
    onSuccess: () => {
      toast.success('Notification updated');
      queryClient.invalidateQueries({ queryKey: [DiscordQueryKey.GuildNotifications] });
      queryClient.invalidateQueries({ queryKey: [DiscordQueryKey.AllNotifications] });
    },
    onError: (err) => {
      toast.error(err.message ?? 'Something went wrong');
    },
  });
};

export default useUpdateDiscordNotificationMutation;
