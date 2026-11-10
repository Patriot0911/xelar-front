import { formatDateTime } from '@/lib/utils';
import UserInfoItem from '../UserInfoItem';
import UserBalanceItem from '../UserBalanceItem';
import UserRolesItem from '../UserRolesItem';
import { IUserDetailsProps } from './UserDetails';

import styles from './styles.module.scss';

const UserDetails = ({ user }: IUserDetailsProps) => (
  <div className={styles.details}>
    <section className={styles.group} aria-labelledby="user-details-account">
      <h3 id="user-details-account" className={styles.title}>Account</h3>
      <dl className={styles.grid}>
        <UserInfoItem label="Email" mono>{user.email}</UserInfoItem>
        <UserInfoItem label="Discord ID" mono>{user.discordId}</UserInfoItem>
        <UserInfoItem label="Twitch" mono>{user.twitchLogin && `@${user.twitchLogin}`}</UserInfoItem>
        <UserInfoItem label="Joined" mono>{formatDateTime(user.createdAt)}</UserInfoItem>
      </dl>
    </section>

    <section className={styles.group} aria-labelledby="user-details-wallet">
      <h3 id="user-details-wallet" className={styles.title}>Wallet</h3>
      <dl className={styles.grid}>
        <UserBalanceItem userId={user.id} balance={user.balance} />
        <UserInfoItem label="Personal subscriptions">
          <span className={styles.flag} data-enabled={String(user.allowPersonalSubscriptions)}>
            {user.allowPersonalSubscriptions ? 'Allowed' : 'Disabled'}
          </span>
        </UserInfoItem>
      </dl>
    </section>

    <section className={`${styles.group} ${styles.wide}`} aria-labelledby="user-details-access">
      <h3 id="user-details-access" className={styles.title}>Access</h3>
      <dl className={styles.grid}>
        <UserRolesItem userId={user.id} roles={user.roles} />
      </dl>
    </section>
  </div>
);

export default UserDetails;
