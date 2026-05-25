import { IModalHeaderProps } from './ModalHeader';

import styles from './styles.module.scss';

const ModalHeader = ({ category, description, title, }: IModalHeaderProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.headerEyebrow}>{category}</div>
      <span className={styles.headerTitle}>
        {title}
      </span>
      <p className={styles.headerSub}>
        {description}
      </p>
    </header>
  );
}

export default ModalHeader;
