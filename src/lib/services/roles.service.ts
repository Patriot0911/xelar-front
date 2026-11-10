import { apiClient } from '@/lib/api-client';
import { expectList, expectObject } from '@/lib/errors';
import { IGenericResponseModel } from '@/lib/models/generic-response.model';
import {
  ICreateRolePayload,
  IEditRolePayload,
  IRoleItem,
  IRolesListParams,
  IRolesListResponse,
} from '@/lib/models/roles/role.model';

const RolesService = {
  getRoles: async (params?: IRolesListParams): Promise<IRolesListResponse> => {
    return apiClient.get('/api/roles', { params }).then(expectList<IRolesListResponse>('/api/roles'));
  },

  getRoleById: async (id: string): Promise<IRoleItem> => {
    return apiClient.get(`/api/roles/${id}`).then(expectObject<IRoleItem>(`/api/roles/${id}`));
  },

  createRole: async (payload: ICreateRolePayload): Promise<IRoleItem> => {
    return await apiClient.post(
      '/api/roles',
      payload,
    );
  },

  editRole: async (id: string, payload: IEditRolePayload): Promise<boolean> => {
    return await apiClient.put(
      `/api/roles/${id}`,
      payload,
    );
  },

  deleteRole: async (id: string): Promise<IRoleItem> => {
    return await apiClient.delete(
      `/api/roles/${id}`,
    );
  },
};

export default RolesService;
