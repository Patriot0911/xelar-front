import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import RolesService from '@/lib/services/roles.service';
import { IEditRolePayload } from '@/lib/models/roles/role.model';
import { RolesQueryKey } from '@/lib/constants/roles';
import { ApiError } from '@/lib/errors';

export interface IEditRoleVars {
  id: string;
  payload: IEditRolePayload;
}

const useEditRoleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<boolean, ApiError, IEditRoleVars>({
    mutationFn: ({ id, payload }) => RolesService.editRole(id, payload),
    onSuccess: () => {
      toast.success('Role updated');
      queryClient.invalidateQueries({ queryKey: [RolesQueryKey.List] });
    },
  });
};

export default useEditRoleMutation;
