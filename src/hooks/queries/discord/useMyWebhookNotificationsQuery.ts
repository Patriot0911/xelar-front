import { useQuery } from '@tanstack/react-query';
import DiscordService, { DiscordQueryKey } from '@/lib/services/discord.service';
import type { IGuildWebhookNotificationsResponse } from '@/lib/models/discord';
import { GUILD_NOTIFICATIONS_PAGE_SIZE, GuildNotificationType } from '@/lib/constants/guild-notifications';

// Key starts with DiscordQueryKey.AllNotifications, so the notification mutations invalidate it.
const useMyWebhookNotificationsQuery = (page: number, search?: string) => {
  return useQuery<IGuildWebhookNotificationsResponse>({
    queryKey: [DiscordQueryKey.AllNotifications, GuildNotificationType.Webhook, page, search],
    queryFn: () => DiscordService.getMyWebhookNotifications({ page, pageSize: GUILD_NOTIFICATIONS_PAGE_SIZE, search }),
    placeholderData: (prev) => prev,
  });
};

export default useMyWebhookNotificationsQuery;
