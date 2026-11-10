import { cn } from '@/lib/utils';
import { IInfoItemProps } from './InfoItem';

import styles from './styles.module.scss';

/** Label/value pair (`<dt>`/`<dd>`) for detail pages; render inside a `<dl>` grid. Empty values show “—”. */
const InfoItem = ({ label, action, fullWidth, mono, children }: IInfoItemProps) => {
  const isEmpty = children === null || children === undefined || children === '';

  return (
    <div className={cn(styles.item, fullWidth && styles.fullWidth)}>
      <div className={styles.head}>
        <dt className={styles.label}>{label}</dt>
        {action}
      </div>
      <dd className={cn(styles.value, mono && styles.mono, isEmpty && styles.empty)}>
        {isEmpty ? '—' : children}
      </dd>
    </div>
  );
};

export default InfoItem;
