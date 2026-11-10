import { useSuspenseQuery } from '@tanstack/react-query';
import DiscordService, { DiscordQueryKey } from '@/lib/services/discord.service';
import type { IDiscordGuildInfoModel } from '@/lib/models/discord/discord-guild-info.model';

/** Suspense query: render inside an `AsyncBoundary`; `data` is always defined. */
const useDiscordGuildInfoQuery = (guildId: string) => {
  return useSuspenseQuery<IDiscordGuildInfoModel>({
    queryKey: [DiscordQueryKey.GuildInfo, guildId],
    queryFn: () => DiscordService.getGuildInfo(guildId),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
};

export default useDiscordGuildInfoQuery;
