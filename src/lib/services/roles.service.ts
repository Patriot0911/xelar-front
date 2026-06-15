import { apiClient } from '@/lib/api-client';
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
    return await apiClient.get(
      '/api/roles',
      { params },
    );
  },

  getRoleById: async (id: string): Promise<IRoleItem> => {
    return await apiClient.get(
      `/api/roles/${id}`,
    );
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
