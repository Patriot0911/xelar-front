import { useMutation, useQueryClient } from '@tanstack/react-query';
import AuthService, { AuthQueryKey } from '@/lib/services/auth.service';
import { IGenericErrorResponseModel } from '@/lib/models/generic-response.model';
import { toast } from 'sonner';

const useRevokeSessionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<boolean, IGenericErrorResponseModel, string>({
    mutationFn: AuthService.revokeSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [AuthQueryKey.Sessions] });
    },
    onError: (err) => {
      toast.error(err.message ?? 'Something went wrong');
    },
  });
};

export default useRevokeSessionMutation;
