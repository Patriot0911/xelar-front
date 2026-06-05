import useMeQuery from '@/hooks/queries/auth/useMeQuery';
import { NavItem } from '@/components/dashboard/nav-data';
import { Permission } from '@/lib/constants/permissions';

export function useFilteredNavItems(items: NavItem[]): NavItem[] {
  const { data } = useMeQuery();

  if (!data) {
    return items.filter((item) => !item.requiredPermissions?.length);
  }

  if (data.permissions.includes(Permission.ADMIN)) {
    return items;
  }

  return items.filter(
    (item) =>
      !item.requiredPermissions?.length ||
      item.requiredPermissions.some((p) => data.permissions.includes(p)),
  );
}
