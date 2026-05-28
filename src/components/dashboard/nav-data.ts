import {
  LuHouse,
  LuArrowLeftRight,
  LuSettings,
  LuTv,
  LuWebhook,
  LuShieldCheck,
} from 'react-icons/lu';
import type { IconType } from 'react-icons';

export interface NavItem {
  label: string;
  href: string;
  icon: IconType;
}

export const NAV_MAIN: NavItem[] = [
  { label: 'Overview',    href: '/dashboard',             icon: LuHouse },
  { label: 'Twitch Apps', href: '/dashboard/twitch-apps', icon: LuTv },
  { label: 'Bridges',     href: '/dashboard/bridges',     icon: LuArrowLeftRight },
];

export const NAV_CONFIGURE: NavItem[] = [
  { label: 'Roles',    href: '/dashboard/roles',    icon: LuShieldCheck },
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
