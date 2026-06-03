import { useQuery } from '@tanstack/react-query';
import DiscordService, { DiscordQueryKey } from '@/lib/services/discord.service';
import type { IDiscordGuildInfoModel } from '@/lib/models/discord/discord-guild-info.model';

const useDiscordGuildInfoQuery = (guildId: string) => {
  return useQuery<IDiscordGuildInfoModel>({
    queryKey: [DiscordQueryKey.GuildInfo, guildId],
    queryFn:  () => DiscordService.getGuildInfo(guildId),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
};

export default useDiscordGuildInfoQuery;
