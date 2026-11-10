'use client';

import { useMemo, useState } from 'react';
import { LuPlus, LuX } from 'react-icons/lu';
import useRolesQuery from '@/hooks/queries/roles/useRolesQuery';
import useUpdateUserRolesMutation from '@/hooks/mutations/users/useUpdateUserRolesMutation';
import IconButton from '@/components/ui/buttons/IconButton';
import { cn } from '@/lib/utils';
import UserInfoItem from '../UserInfoItem';
import { IUserRolesItemProps } from './UserRolesItem';

import styles from './styles.module.scss';

const ROLES_PARAMS = { page: 1, pageSize: 100 };

const UserRolesItem = ({ userId, roles }: IUserRolesItemProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const { data: rolesData, isLoading: isRolesLoading } = useRolesQuery(ROLES_PARAMS);
  const mutation = useUpdateUserRolesMutation();

  const allRoles = useMemo(() => rolesData?.items ?? [], [rolesData]);
  const assignedIds = useMemo(
    () => allRoles.filter((role) => roles.includes(role.name)).map((role) => role.id),
    [allRoles, roles],
  );
  const availableRoles = useMemo(
    () => allRoles.filter((role) => !roles.includes(role.name)),
    [allRoles, roles],
  );

  // Role ids are resolved by name, so editing waits until the catalogue is loaded.
  const isDisabled = isRolesLoading || !rolesData || mutation.isPending;

  const saveRoles = (roleIds: string[], onSuccess?: () => void) => {
    mutation.mutate({ userId, payload: { roleIds } }, { onSuccess });
  };

  const handleRemove = (name: string) => {
    const role = allRoles.find((item) => item.name === name);
    if (!role) return;
    saveRoles(assignedIds.filter((id) => id !== role.id));
  };

  const handleAdd = (roleId: string) => {
    const next = [...assignedIds, roleId];
    // Close the picker once the last available role has been taken.
    saveRoles(next, () => {
      if (availableRoles.length <= 1) setIsAdding(false);
    });
  };

  return (
    <UserInfoItem label="Roles" fullWidth>
      <div className={styles.list}>
        {roles.map((name) => (
          <button
            key={name}
            type="button"
            className={styles.chip}
            disabled={isDisabled}
            onClick={() => handleRemove(name)}
            aria-label={`Remove role ${name}`}
            title={`Remove ${name}`}
          >
            {name}
            <LuX size={11} className={styles.chipIcon} aria-hidden />
          </button>
        ))}

        {!roles.length && !isAdding && <span className={styles.empty}>No roles assigned</span>}

        {isAdding && availableRoles.map((role) => (
          <button
            key={role.id}
            type="button"
            className={cn(styles.chip, styles.suggestion)}
            disabled={isDisabled}
            onClick={() => handleAdd(role.id)}
            aria-label={`Add role ${role.name}`}
          >
            <LuPlus size={11} aria-hidden />
            {role.name}
          </button>
        ))}

        {isAdding && !availableRoles.length && (
          <span className={styles.empty}>All roles are assigned</span>
        )}

        <IconButton
          className={cn(styles.toggle, isAdding && styles.toggleActive)}
          icon={<LuPlus size={13} />}
          label={isAdding ? 'Done adding roles' : 'Add role'}
          variant="accent"
          disabled={isRolesLoading}
          aria-expanded={isAdding}
          onClick={() => setIsAdding((prev) => !prev)}
        />
      </div>
    </UserInfoItem>
  );
};

export default UserRolesItem;
