import { useMutation, useQueryClient } from '@tanstack/react-query';
import AuthService, { AuthQueryKey } from '@/lib/services/auth.service';
import { ApiError } from '@/lib/errors';
import { toast } from 'sonner';

const useRevokeSessionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<boolean, ApiError, string>({
    mutationFn: AuthService.revokeSession,
    onSuccess: () => {
      toast.success('Session revoked');
      queryClient.invalidateQueries({ queryKey: [AuthQueryKey.Sessions] });
    },
  });
};

export default useRevokeSessionMutation;
