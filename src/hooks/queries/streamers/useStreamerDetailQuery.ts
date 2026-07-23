import { useQuery } from '@tanstack/react-query';
import StreamersService from '@/lib/services/streamers.service';
import { IStreamerItem } from '@/lib/models/streamers/streamer.model';
import { StreamersQueryKey } from '@/lib/constants/streamers';

const useStreamerDetailQuery = (streamerId: string) => {
  return useQuery<IStreamerItem>({
    queryKey: [StreamersQueryKey.Detail, streamerId],
    queryFn: () => StreamersService.getStreamerById(streamerId),
    enabled: !!streamerId,
  });
};

export default useStreamerDetailQuery;
