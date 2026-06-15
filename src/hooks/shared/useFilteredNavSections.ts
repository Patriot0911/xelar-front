import useMeQuery from '@/hooks/queries/auth/useMeQuery';
import { NavSection } from '@/components/dashboard/nav-data';
import { Permission } from '@/lib/constants/permissions';

export function useFilteredNavSections(sections: NavSection[]): NavSection[] {
  const { data } = useMeQuery();

  if (!data) {
    return sections.map((section) => ({
      ...section,
      items: section.items.filter((item) => !item.requiredPermissions?.length),
    })).filter((section) => section.items.length > 0);
  }

  if (data.permissions.includes(Permission.ADMIN)) {
    return sections;
  }

  return sections.map((section) => ({
    ...section,
    items: section.items.filter(
      (item) =>
        !item.requiredPermissions?.length ||
        item.requiredPermissions.some((p) => data.permissions.includes(p)),
    )
  })).filter((section) => section.items.length > 0);
};
