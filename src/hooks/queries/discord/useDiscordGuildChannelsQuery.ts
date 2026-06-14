import { useQuery } from '@tanstack/react-query';
import DiscordService, { DiscordQueryKey } from '@/lib/services/discord.service';
import type { IDiscordChannelModel } from '@/lib/models/discord';

const useDiscordGuildChannelsQuery = (guildId: string | undefined) => {
  return useQuery<IDiscordChannelModel[], unknown>({
    queryKey: [DiscordQueryKey.GuildChannels, guildId],
    queryFn: () => DiscordService.getGuildChannels(guildId!),
    enabled: !!guildId,
    staleTime: 10 * 60 * 1000,
    retry: false,
  });
};

export default useDiscordGuildChannelsQuery;
