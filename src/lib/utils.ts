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

/** Date only, `dd.mm.yyyy`. */
export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
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

const compactNumberFormat = new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 });

/** `1234` → `1.2K`. For public-facing counters where precision doesn't matter. */
export const formatCompactNumber = (value: number): string => compactNumberFormat.format(value);
