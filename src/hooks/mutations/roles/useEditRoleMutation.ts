import { useMutation, useQueryClient } from '@tanstack/react-query';
import RolesService from '@/lib/services/roles.service';
import { IEditRolePayload } from '@/lib/models/roles/role.model';
import { RolesQueryKey } from '@/lib/constants/roles';

export interface IEditRoleVars {
  id: string;
  payload: IEditRolePayload;
}

const useEditRoleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<boolean, Error, IEditRoleVars>({
    mutationFn: ({ id, payload }) => RolesService.editRole(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [RolesQueryKey.List] });
    },
  });
};

export default useEditRoleMutation;
