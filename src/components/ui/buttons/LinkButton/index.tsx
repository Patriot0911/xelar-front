import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ILinkButtonProps } from '../buttons';

import styles from './styles.module.scss';

const isExternalHref = (href: string) => /^https?:\/\//.test(href);

const LinkButton = ({
  href,
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  children,
  className,
  ...props
}: ILinkButtonProps) => {
  const classes = cn(styles.linkButton, styles[variant], styles[size], className);

  const content = (
    <>
      {leftIcon && <span className={styles.icon}>{leftIcon}</span>}
      <span className={styles.content}>{children}</span>
      {rightIcon && <span className={cn(styles.icon, styles.trailing)}>{rightIcon}</span>}
    </>
  );

  if (isExternalHref(href)) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={classes} {...props}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {content}
    </Link>
  );
}

export default LinkButton;
