'use client';

import useUserDetailQuery from '@/hooks/queries/users/useUserDetailQuery';
import UserHero from './components/UserHero';
import UserDetails from './components/UserDetails';
import UserActivity from './components/UserActivity';
import { IUserDetailViewProps } from './UserDetailView';

import styles from './styles.module.scss';

/** Render inside an `AsyncBoundary` (see the route page): loading and errors are handled there. */
const UserDetailView = ({ userId }: IUserDetailViewProps) => {
  const { data: user } = useUserDetailQuery(userId);

  return (
    <div className={styles.root}>
      <UserHero user={user} />
      <UserDetails user={user} />
      <UserActivity userId={user.id} />
    </div>
  );
};

export default UserDetailView;
