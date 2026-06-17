import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import DiscordService, { DiscordQueryKey } from '@/lib/services/discord.service';
import { IGenericErrorResponseModel } from '@/lib/models/generic-response.model';

interface ISetManagerPermissionVars {
  guildId: string;
  permission: string | null;
}

const useSetManagerPermissionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<{ success: boolean; }, IGenericErrorResponseModel, ISetManagerPermissionVars>({
    mutationFn: ({ guildId, permission }: ISetManagerPermissionVars) =>
      DiscordService.setManagerPermission(guildId, permission),
    onSuccess: (_, { guildId }) => {
      toast.success('Manager permission updated');
      queryClient.invalidateQueries({ queryKey: [DiscordQueryKey.GuildInfo, guildId] });
    },
    onError: (err) => {
      toast.error(err.message ?? 'Something went wrong');
    },
  });
};

export default useSetManagerPermissionMutation;
