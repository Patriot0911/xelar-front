'use client';

import { LuShieldCheck, LuPencil, LuTrash2 } from 'react-icons/lu';
import { IRoleListItem } from '@/lib/models/roles/role.model';
import { Permission } from '@/lib/constants/permissions';
import styles from './styles.module.scss';
import { PermissionBadge } from '../PermissionBadge';

const MAX_VISIBLE_PERMISSIONS = 3;

interface RolesTableProps {
  roles: IRoleListItem[];
  isLoading?: boolean;
  onEdit?: (role: IRoleListItem) => void;
  onDelete?: (role: IRoleListItem) => void;
}

function SkeletonRow() {
  return (
    <div className={styles.skeletonRow}>
      <div className={styles.skeletonNameCell}>
        <div className={styles.skeletonMark} />
        <div className={styles.skeletonLines}>
          <div className={styles.skeletonText} style={{ width: '45%' }} />
          <div className={styles.skeletonText} style={{ width: '25%', height: '10px' }} />
        </div>
      </div>
      <div className={styles.skeletonText} style={{ width: '30%' }} />
      <div className={styles.skeletonPerms}>
        <div className={styles.skeletonBadge} />
        <div className={styles.skeletonBadge} />
      </div>
      <div />
    </div>
  );
}

function PermissionsList({ permissions }: { permissions: Permission[] }) {
  const visible = permissions.slice(0, MAX_VISIBLE_PERMISSIONS);
  const overflow = permissions.length - MAX_VISIBLE_PERMISSIONS;

  return (
    <div className={styles.permsList}>
      {visible.map((p) => (
        <PermissionBadge key={p} permission={p} />
      ))}
      {overflow > 0 && (
        <span className={styles.permsOverflow}>+{overflow}</span>
      )}
    </div>
  );
}

export function RolesTable({ roles, isLoading, onEdit, onDelete }: RolesTableProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.thead}>
        <span>Name</span>
        <span>Priority</span>
        <span>Permissions</span>
        <span />
      </div>

      {isLoading ? (
        <>
          <SkeletonRow />
          <SkeletonRow />
          <SkeletonRow />
        </>
      ) : (
        roles.map((role) => (
          <div key={role.id} className={styles.trow}>
            <div className={styles.nameCell}>
              <div className={styles.nameMark}>
                <LuShieldCheck size={15} />
              </div>
              <span className={styles.nameText}>{role.name}</span>
            </div>

            <span className={styles.priorityCell}>{role.rolePriority}</span>

            <PermissionsList permissions={role.permissions} />

            <div className={styles.actions}>
              <button
                type="button"
                className={styles.actionBtn}
                aria-label="Edit role"
                onClick={() => onEdit?.(role)}
              >
                <LuPencil size={13} />
              </button>
              <button
                type="button"
                className={`${styles.actionBtn} ${styles.actionBtnDanger}`}
                aria-label="Delete role"
                onClick={() => onDelete?.(role)}
              >
                <LuTrash2 size={13} />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
