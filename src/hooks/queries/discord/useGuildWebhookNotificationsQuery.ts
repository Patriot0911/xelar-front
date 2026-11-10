import { useQuery } from '@tanstack/react-query';
import DiscordService, { DiscordQueryKey } from '@/lib/services/discord.service';
import type { IGuildWebhookNotificationsResponse } from '@/lib/models/discord';
import { GUILD_NOTIFICATIONS_PAGE_SIZE, GuildNotificationType } from '@/lib/constants/guild-notifications';

// Key starts with DiscordQueryKey.GuildNotifications, so the notification mutations invalidate it.
const useGuildWebhookNotificationsQuery = (discordGuildId: string, page: number) => {
  return useQuery<IGuildWebhookNotificationsResponse>({
    queryKey: [DiscordQueryKey.GuildNotifications, discordGuildId, GuildNotificationType.Webhook, page],
    queryFn: () => DiscordService.getGuildWebhookNotifications(discordGuildId, {
      page,
      pageSize: GUILD_NOTIFICATIONS_PAGE_SIZE,
    }),
    placeholderData: (prev) => prev,
    enabled: !!discordGuildId,
    retry: false,
  });
};

export default useGuildWebhookNotificationsQuery;
