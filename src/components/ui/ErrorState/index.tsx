import { LuCircleAlert, LuLock, LuSearchX, LuWifiOff, LuRotateCw } from 'react-icons/lu';
import { IconType } from 'react-icons';
import { cn } from '@/lib/utils';
import { ErrorStateVariant, IErrorStateProps } from './ErrorState';

import styles from './styles.module.scss';

const ICONS: Record<ErrorStateVariant, IconType> = {
  error: LuCircleAlert,
  offline: LuWifiOff,
  'not-found': LuSearchX,
  forbidden: LuLock,
};

const ErrorState = ({
  title,
  description,
  variant = 'error',
  onRetry,
  retryLabel = 'Try again',
  actions,
  details,
  compact,
  className,
}: IErrorStateProps) => {
  const Icon = ICONS[variant];

  return (
    <div role="alert" className={cn(styles.root, styles[variant], compact && styles.compact, className)}>
      <span className={styles.icon} aria-hidden>
        <Icon size={compact ? 18 : 22} />
      </span>
      <div className={styles.text}>
        <p className={styles.title}>{title}</p>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      {(onRetry || actions) && (
        <div className={styles.actions}>
          {onRetry && (
            <button type="button" className={styles.retry} onClick={onRetry}>
              <LuRotateCw size={13} aria-hidden />
              {retryLabel}
            </button>
          )}
          {actions}
        </div>
      )}
      {details && (
        <details className={styles.details}>
          <summary>Technical details</summary>
          <pre>{details}</pre>
        </details>
      )}
    </div>
  );
};

export default ErrorState;
