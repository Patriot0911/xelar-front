import { useQuery } from '@tanstack/react-query';
import DiscordService, { DiscordQueryKey } from '@/lib/services/discord.service';
import type { IDiscordGuildModel } from '@/lib/models/discord';

const useDiscordGuildsQuery = () => {
  return useQuery<IDiscordGuildModel[], unknown>({
    queryKey: [DiscordQueryKey.Guilds],
    queryFn: DiscordService.getGuilds,
    retry: false,
  });
};

export default useDiscordGuildsQuery;
