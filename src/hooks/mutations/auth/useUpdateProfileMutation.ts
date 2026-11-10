import { useMutation, useQueryClient } from '@tanstack/react-query';
import AuthService, { AuthQueryKey } from '@/lib/services/auth.service';
import { IUpdateProfilePayload } from '@/lib/models/auth';
import { ApiError } from '@/lib/errors';
import { toast } from 'sonner';

const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, IUpdateProfilePayload>({
    mutationFn: AuthService.updateProfile,
    onSuccess: () => {
      toast.success('Profile updated successfully');
      queryClient.invalidateQueries({ queryKey: [AuthQueryKey.Me] });
    },
  });
};

export default useUpdateProfileMutation;
