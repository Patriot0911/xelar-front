import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
};

export function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
};

export const ADMINISTRATOR = 0x8;

export const hasBitFlagPermission = (permissions: string, flag: number): boolean => {
  return (BigInt(permissions) & BigInt(flag)) === BigInt(flag);
};
