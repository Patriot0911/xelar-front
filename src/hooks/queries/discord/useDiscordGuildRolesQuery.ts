import { useQuery } from '@tanstack/react-query';
import DiscordService, { DiscordQueryKey } from '@/lib/services/discord.service';
import type { IDiscordRoleModel } from '@/lib/models/discord';

const useDiscordGuildRolesQuery = (guildId: string | undefined) => {
  return useQuery<IDiscordRoleModel[], unknown>({
    queryKey: [DiscordQueryKey.GuildRoles, guildId],
    queryFn: () => DiscordService.getGuildRoles(guildId!),
    enabled: !!guildId,
    staleTime: 10 * 60 * 1000,
    retry: false,
  });
};

export default useDiscordGuildRolesQuery;
