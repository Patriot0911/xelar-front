import { Permission } from '@/lib/constants/permissions';

export interface IRoleItem {
  id: string;
  name: string;
  rolePriority: number;
  permissions: Permission[];
}

export interface IRoleListItem extends IRoleItem {}

export interface ICreateRolePayload {
  name: string;
  permissions: Permission[];
  rolePriority?: number;
}

export interface IEditRolePayload extends ICreateRolePayload {}

export interface IRolesListMeta {
  count: number;
}

export interface IRolesListResponse {
  items: IRoleListItem[];
  meta: IRolesListMeta;
}

export interface IRolesListParams {
  page?: number;
  pageSize?: number;
  search?: string;
}
