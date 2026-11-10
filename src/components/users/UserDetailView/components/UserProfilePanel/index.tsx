'use client';

import { LuBan, LuCircleCheck } from 'react-icons/lu';
import useUpdateUserStatusMutation from '@/hooks/mutations/users/useUpdateUserStatusMutation';
import Panel from '@/components/ui/Panel';
import Button from '@/components/ui/buttons/Button';
import UserStatusBadge from '@/components/users/UserStatusBadge';
import { formatDateTime, getInitials } from '@/lib/utils';
import UserInfoItem from '../UserInfoItem';
import UserBalanceItem from '../UserBalanceItem';
import UserRolesItem from '../UserRolesItem';
import { IUserProfilePanelProps } from './UserProfilePanel';

import styles from './styles.module.scss';

const UserProfilePanel = ({ user }: IUserProfilePanelProps) => {
  const statusMutation = useUpdateUserStatusMutation();
  const isActive = user.status === 'active';

  const handleToggleStatus = () => {
    statusMutation.mutate({
      userId: user.id,
      payload: { status: isActive ? 'blocked' : 'active' },
    });
  };

  return (
    <Panel className={styles.panel}>
      <div className={styles.identity}>
        <div className={styles.avatar} aria-hidden>{getInitials(user.displayName)}</div>
        <div className={styles.identityText}>
          <div className={styles.nameRow}>
            <h2 className={styles.name}>{user.displayName}</h2>
            <UserStatusBadge status={user.status} />
          </div>
          <span className={styles.userId} title={user.id}>{user.id}</span>
        </div>
        <Button
          className={styles.statusButton}
          variant={isActive ? 'danger' : 'secondary'}
          leftIcon={isActive ? <LuBan size={14} /> : <LuCircleCheck size={14} />}
          isLoading={statusMutation.isPending}
          onClick={handleToggleStatus}
        >
          {isActive ? 'Block user' : 'Unblock user'}
        </Button>
      </div>

      <dl className={styles.grid}>
        <UserInfoItem label="Email" mono>{user.email}</UserInfoItem>
        <UserInfoItem label="Discord ID" mono>{user.discordId}</UserInfoItem>
        <UserInfoItem label="Twitch" mono>{user.twitchLogin && `@${user.twitchLogin}`}</UserInfoItem>
        <UserInfoItem label="Joined" mono>{formatDateTime(user.createdAt)}</UserInfoItem>
        <UserBalanceItem userId={user.id} balance={user.balance} />
        <UserInfoItem label="Personal subscriptions">
          <span className={styles.flag} data-enabled={String(user.allowPersonalSubscriptions)}>
            {user.allowPersonalSubscriptions ? 'Allowed' : 'Disabled'}
          </span>
        </UserInfoItem>
        <UserRolesItem userId={user.id} roles={user.roles} />
      </dl>
    </Panel>
  );
};

export default UserProfilePanel;
