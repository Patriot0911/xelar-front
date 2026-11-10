import { cn } from '@/lib/utils';
import { IPanelProps } from './Panel';

import styles from './styles.module.scss';

const Panel = ({ title, titleId, actions, className, children }: IPanelProps) => {
  const hasHeader = Boolean(title || actions);

  return (
    <section className={cn(styles.panel, className)} aria-labelledby={title ? titleId : undefined}>
      {hasHeader && (
        <header className={styles.header}>
          {title && <h2 id={titleId} className={styles.title}>{title}</h2>}
          {actions && <div className={styles.actions}>{actions}</div>}
        </header>
      )}
      {children}
    </section>
  );
};

export default Panel;
