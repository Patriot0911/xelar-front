import { IModalBodyProps } from './ModalBody';
import { cn } from '@/lib/utils';

import styles from './styles.module.scss';

const ModalBody = ({ children, className, ...props }: IModalBodyProps) => {
  return (
    <form
      {...props}
      className={cn(className, styles['body'])}
    >
      {children}
    </form>
  );
}

export default ModalBody;
