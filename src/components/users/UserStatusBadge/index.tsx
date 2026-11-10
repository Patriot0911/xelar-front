import { cn } from '@/lib/utils';
import { ACCOUNT_STATUS_LABELS } from '@/lib/constants/users';
import { IUserStatusBadgeProps } from './UserStatusBadge';

import styles from './styles.module.scss';

const UserStatusBadge = ({ status, className }: IUserStatusBadgeProps) => (
  <span className={cn(styles.badge, styles[status], className)}>
    <span className={styles.dot} aria-hidden />
    {ACCOUNT_STATUS_LABELS[status]}
  </span>
);

export default UserStatusBadge;
