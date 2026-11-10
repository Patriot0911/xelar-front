import { ReactNode } from 'react';
import { IAuthMeResponse } from '@/lib/models/auth';
import { getInitials } from '@/lib/utils';
import styles from './styles.module.scss';

interface IProfileUserInfoProps {
  meData?: IAuthMeResponse;
  action?: ReactNode;
}

const ProfileUserInfo = ({ meData, action }: IProfileUserInfoProps) => {
  const displayName = meData?.displayName ?? 'User';

  return (
    <div className={styles.userInfo}>
      <div className={styles.avatar}>
        {getInitials(displayName)}
      </div>
      <div className={styles.meta}>
        <span className={styles.name}>{displayName}</span>
        <span className={styles['user-balance-wrapepr']}>
          {(meData?.balance ?? 0).toLocaleString()} credits
        </span>
      </div>
      {action}
    </div>
  );
};

export default ProfileUserInfo;
