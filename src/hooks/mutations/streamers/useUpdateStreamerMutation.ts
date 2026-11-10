import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import StreamersService from '@/lib/services/streamers.service';
import { IStreamerItem, IUpdateStreamerPayload } from '@/lib/models/streamers/streamer.model';
import { StreamersQueryKey } from '@/lib/constants/streamers';

interface IUpdateStreamerVars {
  streamerId: string;
  payload: IUpdateStreamerPayload;
}

const useUpdateStreamerMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<IStreamerItem, Error, IUpdateStreamerVars>({
    meta: { errorMessage: 'Failed to update streamer' },
    mutationFn: ({ streamerId, payload }) => StreamersService.updateStreamer(streamerId, payload),
    onSuccess: (_, { streamerId }) => {
      toast.success('Streamer updated');
      queryClient.invalidateQueries({ queryKey: [StreamersQueryKey.Detail, streamerId] });
      queryClient.invalidateQueries({ queryKey: [StreamersQueryKey.List] });
    },
  });
};

export default useUpdateStreamerMutation;
