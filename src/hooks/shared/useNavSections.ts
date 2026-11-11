'use client';

import { useMemo } from 'react';
import useMeQuery from '@/hooks/queries/auth/useMeQuery';
import useFavoriteGuilds from '@/hooks/shared/useFavoriteGuilds';
import { NAV_LIST, NavItem, NavSection, resolveNavSections } from '@/components/dashboard/nav-data';
import { Permission } from '@/lib/constants/permissions';

const canSee = (item: NavItem, permissions: Permission[] | undefined): boolean => {
  if (!item.requiredPermissions?.length) return true;
  if (!permissions) return false;
  if (permissions.includes(Permission.ADMIN)) return true;
  return item.requiredPermissions.some((permission) => permissions.includes(permission));
};

/**
 * The dashboard navigation as rendered by the sidebar and the mobile drawer: `NAV_LIST` with its
 * dynamic sections resolved (favorite servers) and items the user has no permission for removed.
 * Empty sections are dropped.
 */
const useNavSections = (): NavSection[] => {
  const { data: me } = useMeQuery();
  const { favorites } = useFavoriteGuilds();
  const permissions = me?.permissions;

  return useMemo(() => resolveNavSections(NAV_LIST, { favoriteGuilds: favorites })
    .map((section) => ({ ...section, items: section.items.filter((item) => canSee(item, permissions)) }))
    .filter((section) => section.items.length > 0), [favorites, permissions]);
};

export default useNavSections;
