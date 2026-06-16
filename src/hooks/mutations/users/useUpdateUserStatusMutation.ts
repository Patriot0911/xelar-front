import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import UsersService from '@/lib/services/users.service';
import { IUpdateUserStatusPayload } from '@/lib/models/users/user.model';
import { UsersQueryKey } from '@/lib/constants/users';

interface IUpdateUserStatusVars {
  userId: string;
  payload: IUpdateUserStatusPayload;
}

const useUpdateUserStatusMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, IUpdateUserStatusVars>({
    mutationFn: ({ userId, payload }) => UsersService.updateUserStatus(userId, payload),
    onSuccess: (_, { userId, payload }) => {
      toast.success(payload.status === 'blocked' ? 'User blocked' : 'User unblocked');
      queryClient.invalidateQueries({ queryKey: [UsersQueryKey.Detail, userId] });
      queryClient.invalidateQueries({ queryKey: [UsersQueryKey.List] });
    },
    onError: (err) => {
      toast.error(err.message ?? 'Failed to update status');
    },
  });
};

export default useUpdateUserStatusMutation;
