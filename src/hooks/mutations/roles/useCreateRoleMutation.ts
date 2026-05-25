import { useMutation, useQueryClient } from '@tanstack/react-query';
import RolesService from '@/lib/services/roles.service';
import { ICreateRolePayload, IRoleItem } from '@/lib/models/roles/role.model';
import { RolesQueryKey } from '@/lib/constants/roles';

const useCreateRoleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<IRoleItem, Error, ICreateRolePayload>({
    mutationFn: RolesService.createRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [RolesQueryKey.List] });
    },
  });
};

export default useCreateRoleMutation;
