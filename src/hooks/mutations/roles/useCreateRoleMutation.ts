import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import RolesService from '@/lib/services/roles.service';
import { ICreateRolePayload, IRoleItem } from '@/lib/models/roles/role.model';
import { RolesQueryKey } from '@/lib/constants/roles';
import { IGenericErrorResponseModel } from '@/lib/models/generic-response.model';

const useCreateRoleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<IRoleItem, Error, ICreateRolePayload>({
    mutationFn: RolesService.createRole,
    onSuccess: () => {
      toast.success('Role created');
      queryClient.invalidateQueries({ queryKey: [RolesQueryKey.List] });
    },
    onError: (err) => {
      toast.error(err.message ?? 'Something went wrong');
    },
  });
};

export default useCreateRoleMutation;
