import { IPageContentProps } from './PageContent';

import styles from './styles.module.scss';

const PageContent = ({ children }: IPageContentProps) => {
  return (
    <div className={styles.root}>
      {children}
    </div>
  );
}

export default PageContent;
