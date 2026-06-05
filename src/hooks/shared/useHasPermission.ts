import useMeQuery from '@/hooks/queries/auth/useMeQuery';
import { Permission } from '@/lib/constants/permissions';

export function useHasPermission(requiredPermissions: Permission[]): boolean | undefined {
  const { data, isLoading } = useMeQuery();

  if (isLoading || !data) return undefined;
  if (data.permissions.includes(Permission.ADMIN)) return true;
  if (!requiredPermissions.length) return true;

  return requiredPermissions.some((p) => data.permissions.includes(p));
}
