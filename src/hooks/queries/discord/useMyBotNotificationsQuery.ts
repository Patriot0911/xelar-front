import { useQuery } from '@tanstack/react-query';
import DiscordService, { DiscordQueryKey } from '@/lib/services/discord.service';
import type { IGuildBotNotificationsResponse } from '@/lib/models/discord';
import { GUILD_NOTIFICATIONS_PAGE_SIZE, GuildNotificationType } from '@/lib/constants/guild-notifications';

// Key starts with DiscordQueryKey.AllNotifications, so the notification mutations invalidate it.
const useMyBotNotificationsQuery = (page: number, search?: string) => {
  return useQuery<IGuildBotNotificationsResponse>({
    queryKey: [DiscordQueryKey.AllNotifications, GuildNotificationType.Bot, page, search],
    queryFn: () => DiscordService.getMyBotNotifications({ page, pageSize: GUILD_NOTIFICATIONS_PAGE_SIZE, search }),
    placeholderData: (prev) => prev,
  });
};

export default useMyBotNotificationsQuery;
