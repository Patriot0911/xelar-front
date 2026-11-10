import { cn } from '@/lib/utils';
import { IUserInfoItemProps } from './UserInfoItem';

import styles from './styles.module.scss';

const UserInfoItem = ({ label, action, fullWidth, mono, children }: IUserInfoItemProps) => {
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

export default UserInfoItem;
