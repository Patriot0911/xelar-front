import { Permission, PERMISSION_LABELS } from '@/lib/constants/permissions';
import styles from './styles.module.scss';

interface PermissionBadgeProps {
  permission: Permission;
}

export function PermissionBadge({ permission }: PermissionBadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[permission.replace('_', '-')]}`}>
      {PERMISSION_LABELS[permission]}
    </span>
  );
}
