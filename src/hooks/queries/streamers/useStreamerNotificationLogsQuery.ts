import { useQuery } from '@tanstack/react-query';
import StreamersService from '@/lib/services/streamers.service';
import { IStreamerNotificationLog } from '@/lib/models/streamers/streamer.model';
import { StreamersQueryKey } from '@/lib/constants/streamers';

const useStreamerNotificationLogsQuery = (streamerId: string) => {
  return useQuery<IStreamerNotificationLog[]>({
    queryKey: [StreamersQueryKey.Logs, streamerId],
    queryFn: () => StreamersService.getStreamerNotificationLogs(streamerId),
    enabled: !!streamerId,
  });
};

export default useStreamerNotificationLogsQuery;
