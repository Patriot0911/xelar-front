import { useQuery } from '@tanstack/react-query';
import DiscordService, { DiscordQueryKey } from '@/lib/services/discord.service';
import type { IGuildNotificationsResponse } from '@/lib/models/discord';

const useGuildNotificationsQuery = (discordGuildId: string) => {
  return useQuery<IGuildNotificationsResponse, unknown>({
    queryKey: [DiscordQueryKey.GuildNotifications, discordGuildId],
    queryFn: () => DiscordService.getGuildNotifications(discordGuildId),
    enabled: !!discordGuildId,
    retry: false,
  });
};

export default useGuildNotificationsQuery;
