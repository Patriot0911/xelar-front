import { cn } from '@/lib/utils';
import { IXelarLogoProps } from './XelarLogo';

import styles from './styles.module.scss';

const XelarLogo = ({ responsive = true, className }: IXelarLogoProps) => {
  return (
    <div className={cn(styles.brand, responsive && styles.responsive, className)}>
      <span className={styles.wm}>
        <span className={styles.wmX}>X</span>
        <span className={styles.wmText}>elar</span>
      </span>
      <span className={styles.wmDot} aria-hidden="true" />
    </div>
  );
}

export default XelarLogo;
