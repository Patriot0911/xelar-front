import type { ReactNode } from 'react';
import styles from './styles.module.scss';

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  count?: number;
  description?: string;
  actions?: ReactNode;
}

export function PageHeader({ eyebrow, title, count, description, actions }: PageHeaderProps) {
  return (
    <div className={styles.root}>
      <div className={styles.left}>
        {eyebrow && (
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            {eyebrow}
          </div>
        )}
        <h1 className={styles.title}>
          {title}
          {count !== undefined && <span className={styles.count}>{count}</span>}
        </h1>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  );
}
