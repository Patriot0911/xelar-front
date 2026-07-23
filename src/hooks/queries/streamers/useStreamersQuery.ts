import { useQuery } from '@tanstack/react-query';
import StreamersService from '@/lib/services/streamers.service';
import { IStreamersListParams, IStreamersListResponse } from '@/lib/models/streamers/streamer.model';
import { StreamersQueryKey } from '@/lib/constants/streamers';

const useStreamersQuery = (params?: IStreamersListParams) => {
  return useQuery<IStreamersListResponse>({
    queryKey: [StreamersQueryKey.List, params],
    queryFn: () => StreamersService.getStreamers(params),
  });
};

export default useStreamersQuery;
