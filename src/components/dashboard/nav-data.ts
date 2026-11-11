import {
  LuHouse,
  LuTv,
  LuShieldCheck,
  LuBell,
  LuRadio,
  LuUser,
  LuUsers,
} from 'react-icons/lu';
import { SiDiscord } from 'react-icons/si';
import type { IconType } from 'react-icons';
import { Permission } from '@/lib/constants/permissions';
import type { IFavoriteGuild } from '@/lib/models/discord';
import { getInitials } from '@/lib/utils';

/** Picture for an entity link (a server's logo); `fallback` (initials) shows when there is no `url`. */
export interface INavItemImage {
  url: string | null;
  fallback: string;
}

interface INavItemBase {
  label: string;
  href: string;
  requiredPermissions?: Permission[];
}

/** A nav link shows either an icon (pages) or an image (entities such as favorite servers). */
export type NavItem = INavItemBase & (
  | { icon: IconType; image?: never }
  | { image: INavItemImage; icon?: never }
);

export interface NavSection {
  /** Stable React key; labels may repeat or change. */
  key: string;
  label: string;
  items: NavItem[];
};

/** Runtime data the dynamic sections are built from. */
export interface INavContext {
  favoriteGuilds: IFavoriteGuild[];
}

/** A section is either static or built from the context; `null` / no items → not rendered. */
export type NavSectionSource = NavSection | ((context: INavContext) => NavSection | null);

export const NAV_MAIN: NavItem[] = [
  {
    label: 'Overview',
    href: '/dashboard',
    icon: LuHouse
  },
  {
    label: 'Discord Servers',
    href: '/dashboard/discord',
    icon: SiDiscord
  },
];

export const NAV_NOTIFICATIONS: NavItem[] = [
  {
    label: 'My Notifications',
    href: '/dashboard/notifications',
    icon: LuBell
  },
];

export const NAV_CONFIGURE: NavItem[] = [
  {
    label: 'Twitch Apps',
    href: '/dashboard/twitch-apps',
    icon: LuTv,
    requiredPermissions: [Permission.READ_APPS, Permission.MANAGE_APPS]
  },
  {
    label: 'Twitch Subscriptions',
    href: '/dashboard/twitch-subscriptions',
    icon: LuRadio,
    requiredPermissions: [Permission.READ_APPS, Permission.MANAGE_APPS]
  },
  {
    label: 'Users',
    href: '/dashboard/users',
    icon: LuUser,
    requiredPermissions: [Permission.ADMIN]
  },
  {
    label: 'Streamers',
    href: '/dashboard/streamers',
    icon: LuUsers,
    requiredPermissions: [Permission.ADMIN]
  },
  {
    label: 'Roles',
    href: '/dashboard/roles',
    icon: LuShieldCheck,
    requiredPermissions: [Permission.READ_ROLES, Permission.MANAGE_ROLES]
  },
];

/** Shown only while at least one server is saved to favorites (bookmark on the server page). */
const getFavoritesSection = ({ favoriteGuilds }: INavContext): NavSection | null => (
  favoriteGuilds.length
    ? {
      key: 'favorites',
      label: 'Favorites',
      items: favoriteGuilds.map((guild) => ({
        label: guild.name,
        href: `/dashboard/discord/${guild.id}`,
        image: { url: guild.iconUrl, fallback: getInitials(guild.name) },
      })),
    }
    : null
);

/** Order of the sidebar / mobile drawer. Render through `useNavSections`, never this list directly. */
export const NAV_LIST: NavSectionSource[] = [
  { key: 'overview', label: 'Overview', items: NAV_MAIN },
  getFavoritesSection,
  { key: 'media', label: 'Media', items: NAV_NOTIFICATIONS },
  { key: 'configure', label: 'Configure', items: NAV_CONFIGURE },
];

export const resolveNavSections = (sources: NavSectionSource[], context: INavContext): NavSection[] =>
  sources
    .map((source) => (typeof source === 'function' ? source(context) : source))
    .filter((section): section is NavSection => !!section && section.items.length > 0);

const matchesPath = (pathname: string, href: string): boolean => {
  if (href === '/dashboard') return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
};

/**
 * The one nav link to highlight: the longest href that contains the current path. On a favorite
 * server's page that is the server itself, not "Discord Servers" (`/dashboard/discord`) as well.
 */
export const getActiveHref = (pathname: string, sections: NavSection[]): string | null =>
  sections
    .flatMap((section) => section.items.map((item) => item.href))
    .filter((href) => matchesPath(pathname, href))
    .reduce<string | null>((best, href) => (!best || href.length > best.length ? href : best), null);
