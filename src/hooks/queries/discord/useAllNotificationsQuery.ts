import { useQuery } from '@tanstack/react-query';
import DiscordService, { DiscordQueryKey } from '@/lib/services/discord.service';
import type { IGuildNotificationsResponse } from '@/lib/models/discord';

const useAllNotificationsQuery = () => {
  return useQuery<IGuildNotificationsResponse, unknown>({
    queryKey: [DiscordQueryKey.AllNotifications],
    queryFn: DiscordService.getAllNotifications,
    retry: false,
  });
};

export default useAllNotificationsQuery;
