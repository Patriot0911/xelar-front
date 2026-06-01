import { IAuthMeResponse } from '@/lib/models/auth';
import { getInitials } from '@/lib/utils';
import styles from './styles.module.scss';

interface IProfileUserInfoProps {
  meData?: IAuthMeResponse;
}

const ProfileUserInfo = ({ meData }: IProfileUserInfoProps) => {
  const displayName = meData?.displayName ?? 'User';

  return (
    <div className={styles.userInfo}>
      <div className={styles.avatar}>
        {getInitials(displayName)}
        <span className={styles.online} aria-hidden="true" />
      </div>
      <div className={styles.meta}>
        <span className={styles.name}>{displayName}</span>
        <span className={styles.sub}>
          {meData?.discordId ? `discord · ${meData.discordId}` : 'workspace'}
        </span>
      </div>
    </div>
  );
};

export default ProfileUserInfo;
