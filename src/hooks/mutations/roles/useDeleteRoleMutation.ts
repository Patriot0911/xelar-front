import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import RolesService from '@/lib/services/roles.service';
import { IRoleItem } from '@/lib/models/roles/role.model';
import { RolesQueryKey } from '@/lib/constants/roles';
import { IGenericErrorResponseModel } from '@/lib/models/generic-response.model';

const useDeleteRoleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<IRoleItem, IGenericErrorResponseModel, string>({
    mutationFn: RolesService.deleteRole,
    onSuccess: () => {
      toast.success('Role deleted');
      queryClient.invalidateQueries({ queryKey: [RolesQueryKey.List] });
    },
    onError: (err) => {
      toast.error(err.message ?? 'Something went wrong');
    },
  });
};

export default useDeleteRoleMutation;
