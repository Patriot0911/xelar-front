'use client';

import useUserDetailQuery from '@/hooks/queries/users/useUserDetailQuery';
import Loading from '@/components/ui/Loading';
import UserProfilePanel from './components/UserProfilePanel';
import UserActivityPanel from './components/UserActivityPanel';
import { IUserDetailViewProps } from './UserDetailView';

import styles from './styles.module.scss';

const UserDetailView = ({ userId }: IUserDetailViewProps) => {
  const { data: user, isLoading } = useUserDetailQuery(userId);

  if (isLoading) {
    return <Loading type="block" title="Loading user" />;
  }

  if (!user) {
    return <div className={styles.state}>User not found</div>;
  }

  return (
    <div className={styles.root}>
      <UserProfilePanel user={user} />
      <UserActivityPanel userId={user.id} />
    </div>
  );
};

export default UserDetailView;
