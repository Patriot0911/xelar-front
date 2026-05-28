
import { getInitials } from '@/lib/utils';
import styles from './styles.module.scss';
import useMeQuery from '@/hooks/queries/auth/useMeQuery';

const DashboardUserCard = () => {
  const { data: meData } = useMeQuery();
  const displayName = meData?.displayName ?? 'User';

  return (
    <div className={styles.user}>
      <div className={styles.userAv}>
        {getInitials(displayName)}
        <span className={styles.userOnline} aria-hidden="true" />
      </div>
      <div className={styles.userMeta}>
        <span className={styles.userName}>{displayName}</span>
        <span className={styles.userSub}>
          {meData?.discordId ? `discord · ${meData.discordId}` : 'workspace'}
        </span>
      </div>
    </div>
  );
}

export default DashboardUserCard;
