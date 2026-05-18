'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: 'default' | 'ghost' | 'outline' | 'discord';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', asChild = false, loading, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] disabled:opacity-50 disabled:pointer-events-none',
          {
            // variant
            'bg-[var(--accent)] text-white hover:opacity-90 shadow-[0_0_18px_var(--accent-glow)]':
              variant === 'default',
            'bg-transparent hover:bg-[var(--surface-2)] text-[var(--ink-1)] hover:text-[var(--ink-0)]':
              variant === 'ghost',
            'border border-[var(--line-strong)] bg-[var(--surface-2)] text-[var(--ink-0)] hover:bg-[var(--surface-3)]':
              variant === 'outline',
            'bg-gradient-to-br from-[#5865F2] to-[#4752C4] text-white border-0 shadow-[0_0_28px_rgba(88,101,242,0.35),0_4px_14px_rgba(0,0,0,0.4)] hover:shadow-[0_0_42px_rgba(88,101,242,0.50),0_8px_18px_rgba(0,0,0,0.5)] hover:-translate-y-px':
              variant === 'discord',
            // size
            'h-8 px-3 text-xs rounded-lg': size === 'sm',
            'h-11 px-5 text-sm rounded-xl': size === 'md',
            'h-12 px-6 text-[14.5px] rounded-xl': size === 'lg',
          },
          className,
        )}
        {...props}
      >
        {loading ? (
          <>
            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            {children}
          </>
        ) : (
          children
        )}
      </Comp>
    );
  },
);

Button.displayName = 'Button';
export { Button };
