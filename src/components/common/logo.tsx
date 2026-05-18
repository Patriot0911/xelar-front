import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
}

export function Logo({ size = 24, className, showText = true }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <svg
        viewBox="0 0 32 32"
        width={size}
        height={size}
        fill="none"
        stroke="url(#xelarGrad)"
        strokeWidth="3"
        strokeLinecap="round"
        aria-hidden="true"
        style={{
          filter: 'drop-shadow(0 0 6px var(--accent-glow)) drop-shadow(0 0 12px var(--accent-glow-2))',
        }}
      >
        <defs>
          <linearGradient id="xelarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--accent)" />
            <stop offset="100%" stopColor="var(--accent-2)" />
          </linearGradient>
        </defs>
        <path d="M6 6 L13.5 13.5" />
        <path d="M18.5 18.5 L26 26" />
        <path d="M26 6 L18.5 13.5" />
        <path d="M13.5 18.5 L6 26" />
      </svg>
      {showText && (
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            letterSpacing: '-0.01em',
          }}
        >
          Xelar
        </span>
      )}
    </span>
  );
}
