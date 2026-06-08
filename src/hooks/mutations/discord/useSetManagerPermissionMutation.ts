import { useMutation, useQueryClient } from '@tanstack/react-query';
import DiscordService, { DiscordQueryKey } from '@/lib/services/discord.service';

interface ISetManagerPermissionVars {
  guildId: string;
  permission: string | null;
}

const useSetManagerPermissionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ guildId, permission }: ISetManagerPermissionVars) =>
      DiscordService.setManagerPermission(guildId, permission),
    onSuccess: (_, { guildId }) => {
      queryClient.invalidateQueries({ queryKey: [DiscordQueryKey.GuildInfo, guildId] });
    },
  });
};

export default useSetManagerPermissionMutation;
