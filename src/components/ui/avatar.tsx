import { cn } from '@/lib/utils';

interface AvatarProps {
  initials: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  style?: React.CSSProperties;
  className?: string;
}

const sizeMap = {
  xs: 'w-6 h-6 text-[10px] rounded-[6px]',
  sm: 'w-7 h-7 text-[11px] rounded-[7px]',
  md: 'w-9 h-9 text-[13px] rounded-[10px]',
  lg: 'w-12 h-12 text-[16px] rounded-[12px]',
};

export function Avatar({ initials, size = 'md', style, className }: AvatarProps) {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
        ...style,
      }}
      className={cn(
        'inline-grid place-items-center font-bold text-white flex-shrink-0 select-none',
        sizeMap[size],
        className,
      )}
    >
      {initials.slice(0, 2).toUpperCase()}
    </div>
  );
}
