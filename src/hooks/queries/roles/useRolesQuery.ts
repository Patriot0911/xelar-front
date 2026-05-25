import { useQuery } from '@tanstack/react-query';
import RolesService from '@/lib/services/roles.service';
import { IRolesListParams, IRolesListResponse } from '@/lib/models/roles/role.model';
import { RolesQueryKey } from '@/lib/constants/roles';

const useRolesQuery = (params?: IRolesListParams) => {
  return useQuery<IRolesListResponse>({
    queryKey: [RolesQueryKey.List, params],
    queryFn: () => RolesService.getRoles(params),
  });
};

export default useRolesQuery;
