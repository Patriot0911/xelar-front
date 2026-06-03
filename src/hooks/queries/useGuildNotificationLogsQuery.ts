import { useQuery } from '@tanstack/react-query';
import NotificationLogsService, { NotificationLogsQueryKey } from '@/lib/services/notification-logs.service';
import type { INotificationLogsResponse } from '@/lib/models/notification-log.model';

const PAGE_SIZE = 20;

const useGuildNotificationLogsQuery = (guildId: string, page: number) => {
  return useQuery<INotificationLogsResponse>({
    queryKey: [NotificationLogsQueryKey.GuildLogs, guildId, page],
    queryFn:  () => NotificationLogsService.getGuildLogs(guildId, page, PAGE_SIZE),
    placeholderData: (prev) => prev,
    staleTime: 30 * 1000,
  });
};

export default useGuildNotificationLogsQuery;
