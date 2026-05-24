import {
  LuHouse,
  LuArrowLeftRight,
  LuMessageSquare,
  LuSettings,
  LuTv,
  LuActivity,
  LuWebhook,
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
  { label: 'Channels',    href: '/dashboard/channels',    icon: LuMessageSquare },
  { label: 'Activity',    href: '/dashboard/activity',    icon: LuActivity },
];

export const NAV_CONFIGURE: NavItem[] = [
  { label: 'Webhooks', href: '/dashboard/webhooks', icon: LuWebhook },
  { label: 'Settings', href: '/dashboard/settings', icon: LuSettings },
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
