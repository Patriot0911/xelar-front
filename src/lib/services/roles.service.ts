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
    const res = await apiClient.get<never, IGenericResponseModel<IRolesListResponse>>(
      '/api/roles',
      { params },
    );
    return res.data;
  },

  getRoleById: async (id: string): Promise<IRoleItem> => {
    const res = await apiClient.get<never, IGenericResponseModel<IRoleItem>>(
      `/api/roles/${id}`,
    );
    return res.data;
  },

  createRole: async (payload: ICreateRolePayload): Promise<IRoleItem> => {
    const res = await apiClient.post<never, IGenericResponseModel<IRoleItem>>(
      '/api/roles',
      payload,
    );
    return res.data;
  },

  editRole: async (id: string, payload: IEditRolePayload): Promise<boolean> => {
    const res = await apiClient.put<never, IGenericResponseModel<boolean>>(
      `/api/roles/${id}`,
      payload,
    );
    return res.data;
  },

  deleteRole: async (id: string): Promise<IRoleItem> => {
    const res = await apiClient.delete<never, IGenericResponseModel<IRoleItem>>(
      `/api/roles/${id}`,
    );
    return res.data;
  },
};

export default RolesService;
