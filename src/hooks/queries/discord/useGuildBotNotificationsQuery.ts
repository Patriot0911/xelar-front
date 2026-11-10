import { useQuery } from '@tanstack/react-query';
import DiscordService, { DiscordQueryKey } from '@/lib/services/discord.service';
import type { IGuildBotNotificationsResponse } from '@/lib/models/discord';
import { GUILD_NOTIFICATIONS_PAGE_SIZE, GuildNotificationType } from '@/lib/constants/guild-notifications';

// Key starts with DiscordQueryKey.GuildNotifications, so the notification mutations invalidate it.
const useGuildBotNotificationsQuery = (discordGuildId: string, page: number) => {
  return useQuery<IGuildBotNotificationsResponse>({
    queryKey: [DiscordQueryKey.GuildNotifications, discordGuildId, GuildNotificationType.Bot, page],
    queryFn: () => DiscordService.getGuildBotNotifications(discordGuildId, {
      page,
      pageSize: GUILD_NOTIFICATIONS_PAGE_SIZE,
    }),
    placeholderData: (prev) => prev,
    enabled: !!discordGuildId,
    retry: false,
  });
};

export default useGuildBotNotificationsQuery;
