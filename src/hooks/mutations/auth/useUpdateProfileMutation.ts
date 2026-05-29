import { useMutation, useQueryClient } from '@tanstack/react-query';
import AuthService, { AuthQueryKey } from '@/lib/services/auth.service';
import { IUpdateProfilePayload } from '@/lib/models/auth';
import { IGenericErrorResponseModel } from '@/lib/models/generic-response.model';
import { toast } from 'sonner';

const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, IGenericErrorResponseModel, IUpdateProfilePayload>({
    mutationFn: AuthService.updateProfile,
    onSuccess: () => {
      toast.success('Profile updated successfully');
      queryClient.invalidateQueries({ queryKey: [AuthQueryKey.Me] });
    },
    onError: (err) => {
      toast.error(err.message ?? 'Something went wrong');
    },
  });
};

export default useUpdateProfileMutation;
