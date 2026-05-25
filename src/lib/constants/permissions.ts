export enum Permission {
  ADMIN = 'admin',
  READ_APPS = 'read_apps',
  MANAGE_APPS = 'manage_apps',
  READ_ROLES = 'read_roles',
  MANAGE_ROLES = 'manage_roles',
}

export const PERMISSION_LABELS: Record<Permission, string> = {
  [Permission.ADMIN]: 'Admin',
  [Permission.READ_APPS]: 'Read Apps',
  [Permission.MANAGE_APPS]: 'Manage Apps',
  [Permission.READ_ROLES]: 'Read Roles',
  [Permission.MANAGE_ROLES]: 'Manage Roles',
};

export const ALL_PERMISSIONS = Object.values(Permission);
