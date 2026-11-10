import { cn } from '@/lib/utils';
import { ILoadingProps, LoadingSize, LoadingType } from './Loading';

import styles from './styles.module.scss';

const DEFAULT_SIZE: Record<LoadingType, LoadingSize> = {
  spinner: 'md',
  inline: 'sm',
  block: 'md',
  card: 'lg',
};

const Loading = ({
  type = 'spinner',
  tone = 'accent',
  size,
  title,
  description,
  className,
}: ILoadingProps) => {
  const ring = <span className={cn(styles.ring, styles[size ?? DEFAULT_SIZE[type]])} aria-hidden />;
  const hasText = type !== 'spinner' && Boolean(title || description);

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(styles.root, styles[type], styles[tone], className)}
    >
      {ring}
      {hasText ? (
        <div className={styles.text}>
          {title && <p className={styles.title}>{title}</p>}
          {description && <p className={styles.description}>{description}</p>}
        </div>
      ) : (
        <span className={styles.srOnly}>{title ?? 'Loading'}</span>
      )}
    </div>
  );
};

export default Loading;
