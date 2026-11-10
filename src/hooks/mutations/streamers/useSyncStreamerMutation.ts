import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import StreamersService from '@/lib/services/streamers.service';
import { IStreamerItem } from '@/lib/models/streamers/streamer.model';
import { StreamersQueryKey } from '@/lib/constants/streamers';

const useSyncStreamerMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<IStreamerItem, Error, string>({
    meta: { errorMessage: 'Failed to sync streamer' },
    mutationFn: (streamerId) => StreamersService.syncStreamer(streamerId),
    onSuccess: (_, streamerId) => {
      toast.success('Streamer synced from Twitch');
      queryClient.invalidateQueries({ queryKey: [StreamersQueryKey.Detail, streamerId] });
      queryClient.invalidateQueries({ queryKey: [StreamersQueryKey.List] });
    },
  });
};

export default useSyncStreamerMutation;
