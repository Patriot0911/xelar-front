import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import UsersService from '@/lib/services/users.service';
import { UsersQueryKey } from '@/lib/constants/users';

interface IDeleteUserSessionVars {
  userId: string;
  sessionId: string;
}

const useDeleteUserSessionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, IDeleteUserSessionVars>({
    mutationFn: ({ userId, sessionId }) => UsersService.deleteUserSession(userId, sessionId),
    onSuccess: (_, { userId }) => {
      toast.success('Session revoked');
      queryClient.invalidateQueries({ queryKey: [UsersQueryKey.Sessions, userId] });
    },
    onError: (err) => {
      toast.error(err.message ?? 'Failed to revoke session');
    },
  });
};

export default useDeleteUserSessionMutation;
