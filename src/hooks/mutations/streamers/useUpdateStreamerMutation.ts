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
    mutationFn: ({ streamerId, payload }) => StreamersService.updateStreamer(streamerId, payload),
    onSuccess: (_, { streamerId }) => {
      toast.success('Streamer updated');
      queryClient.invalidateQueries({ queryKey: [StreamersQueryKey.Detail, streamerId] });
      queryClient.invalidateQueries({ queryKey: [StreamersQueryKey.List] });
    },
    onError: (err) => {
      toast.error(err.message ?? 'Failed to update streamer');
    },
  });
};

export default useUpdateStreamerMutation;
