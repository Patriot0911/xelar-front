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

export const formatDateTime = (date: string | Date): string => {
  return new Date(date).toLocaleString('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};
