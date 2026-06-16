import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import UsersService from '@/lib/services/users.service';
import { IUpdateUserBalancePayload } from '@/lib/models/users/user.model';
import { UsersQueryKey } from '@/lib/constants/users';

interface IUpdateUserBalanceVars {
  userId: string;
  payload: IUpdateUserBalancePayload;
}

const useUpdateUserBalanceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, IUpdateUserBalanceVars>({
    mutationFn: ({ userId, payload }) => UsersService.updateUserBalance(userId, payload),
    onSuccess: (_, { userId }) => {
      toast.success('Balance updated');
      queryClient.invalidateQueries({ queryKey: [UsersQueryKey.Detail, userId] });
      queryClient.invalidateQueries({ queryKey: [UsersQueryKey.List] });
    },
    onError: (err) => {
      toast.error(err.message ?? 'Failed to update balance');
    },
  });
};

export default useUpdateUserBalanceMutation;
