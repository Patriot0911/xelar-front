import { useSuspenseQuery } from '@tanstack/react-query';
import StreamersService from '@/lib/services/streamers.service';
import { IStreamerItem } from '@/lib/models/streamers/streamer.model';
import { StreamersQueryKey } from '@/lib/constants/streamers';

/** Suspense query: render inside an `AsyncBoundary`; `data` is always defined. */
const useStreamerDetailQuery = (streamerId: string) => {
  return useSuspenseQuery<IStreamerItem>({
    queryKey: [StreamersQueryKey.Detail, streamerId],
    queryFn: () => StreamersService.getStreamerById(streamerId),
  });
};

export default useStreamerDetailQuery;
