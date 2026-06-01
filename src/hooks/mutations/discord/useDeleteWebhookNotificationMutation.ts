import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import DiscordService, { DiscordQueryKey } from '@/lib/services/discord.service';

const useDeleteWebhookNotificationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: DiscordService.deleteWebhookNotification,
    onSuccess: () => {
      toast.success('Notification deleted');
      queryClient.invalidateQueries({ queryKey: [DiscordQueryKey.GuildNotifications] });
      queryClient.invalidateQueries({ queryKey: [DiscordQueryKey.AllNotifications] });
    },
    onError: () => {
      toast.error('Failed to delete notification');
    },
  });
};

export default useDeleteWebhookNotificationMutation;
