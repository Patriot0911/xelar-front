import { IPageHeaderProps } from './PageHeader';

import styles from './styles.module.scss';

const PageHeader = ({ eyebrow, title, count, description, actions, children }: IPageHeaderProps) => {
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
      {children}
    </div>
  );
}

export default PageHeader;
