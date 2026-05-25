import { IModalFooterProps } from './ModalFooter';

import styles from './styles.module.scss';

const ModalFooter = ({ children }: IModalFooterProps) => {
  return (
    <footer className={styles['footer']}>
      {children}
    </footer>
  );
}

export default ModalFooter;
