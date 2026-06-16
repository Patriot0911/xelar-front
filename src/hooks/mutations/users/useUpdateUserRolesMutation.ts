import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import UsersService from '@/lib/services/users.service';
import { IUpdateUserRolesPayload } from '@/lib/models/users/user.model';
import { UsersQueryKey } from '@/lib/constants/users';

interface IUpdateUserRolesVars {
  userId: string;
  payload: IUpdateUserRolesPayload;
}

const useUpdateUserRolesMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, IUpdateUserRolesVars>({
    mutationFn: ({ userId, payload }) => UsersService.updateUserRoles(userId, payload),
    onSuccess: (_, { userId }) => {
      toast.success('Roles updated');
      queryClient.invalidateQueries({ queryKey: [UsersQueryKey.Detail, userId] });
      queryClient.invalidateQueries({ queryKey: [UsersQueryKey.List] });
    },
    onError: (err) => {
      toast.error(err.message ?? 'Failed to update roles');
    },
  });
};

export default useUpdateUserRolesMutation;
