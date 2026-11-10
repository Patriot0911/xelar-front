import { useSuspenseQuery } from '@tanstack/react-query';
import DiscordService, { DiscordQueryKey } from '@/lib/services/discord.service';
import type { IDiscordGuildModel } from '@/lib/models/discord';

/** Suspense query: render inside an `AsyncBoundary`; `data` is always defined. */
const useDiscordGuildsQuery = () => {
  return useSuspenseQuery<IDiscordGuildModel[]>({
    queryKey: [DiscordQueryKey.Guilds],
    queryFn: DiscordService.getGuilds,
    retry: false,
  });
};

export default useDiscordGuildsQuery;
