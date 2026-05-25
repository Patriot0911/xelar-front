import { useMutation, useQueryClient } from '@tanstack/react-query';
import RolesService from '@/lib/services/roles.service';
import { IRoleItem } from '@/lib/models/roles/role.model';
import { RolesQueryKey } from '@/lib/constants/roles';

const useDeleteRoleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<IRoleItem, Error, string>({
    mutationFn: RolesService.deleteRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [RolesQueryKey.List] });
    },
  });
};

export default useDeleteRoleMutation;
