import {
  LuHouse,
  LuTv,
  LuShieldCheck,
  LuBell,
  LuRadio,
} from 'react-icons/lu';
import { SiDiscord } from 'react-icons/si';
import type { IconType } from 'react-icons';
import { Permission } from '@/lib/constants/permissions';

export interface NavItem {
  label: string;
  href: string;
  icon: IconType;
  requiredPermissions?: Permission[];
};

export interface NavSection {
  label: string;
  items: NavItem[];
};

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
    label: 'All Notifications',
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
    label: 'Roles',
    href: '/dashboard/roles',
    icon: LuShieldCheck,
    requiredPermissions: [Permission.READ_ROLES, Permission.MANAGE_ROLES]
  },
];

export const NAV_LIST: NavSection[] = [
  {
    label: 'Overview',
    items: NAV_MAIN,
  },
  {
    label: 'Media',
    items: NAV_NOTIFICATIONS,
  },
  {
    label: 'Configure',
    items: NAV_CONFIGURE,
  },
];

export function isActive(pathname: string, href: string): boolean {
  if (href === '/dashboard') return pathname === href;
  return pathname.startsWith(href);
}

export function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}
