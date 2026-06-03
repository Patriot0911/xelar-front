import { useMutation, useQueryClient } from '@tanstack/react-query';
import DiscordService, { DiscordQueryKey } from '@/lib/services/discord.service';

interface ISetManagerRoleVars {
  guildId: string;
  roleId: string | null;
}

const useSetManagerRoleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ guildId, roleId }: ISetManagerRoleVars) =>
      DiscordService.setManagerRole(guildId, roleId),
    onSuccess: (_, { guildId }) => {
      queryClient.invalidateQueries({ queryKey: [DiscordQueryKey.GuildInfo, guildId] });
    },
  });
};

export default useSetManagerRoleMutation;
