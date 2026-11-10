import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import RolesService from '@/lib/services/roles.service';
import { IRoleItem } from '@/lib/models/roles/role.model';
import { RolesQueryKey } from '@/lib/constants/roles';
import { ApiError } from '@/lib/errors';

const useDeleteRoleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<IRoleItem, ApiError, string>({
    mutationFn: RolesService.deleteRole,
    onSuccess: () => {
      toast.success('Role deleted');
      queryClient.invalidateQueries({ queryKey: [RolesQueryKey.List] });
    },
  });
};

export default useDeleteRoleMutation;
