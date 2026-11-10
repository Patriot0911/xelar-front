import { cn } from '@/lib/utils';
import { IIconButtonProps } from './IconButton';

import styles from './styles.module.scss';

const IconButton = ({
  icon,
  label,
  variant = 'default',
  size = 'sm',
  className,
  ...props
}: IIconButtonProps) => {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={cn(styles.button, styles[variant], styles[size], className)}
      {...props}
    >
      {icon}
    </button>
  );
};

export default IconButton;
