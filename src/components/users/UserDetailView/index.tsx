'use client';

import useUserDetailQuery from '@/hooks/queries/users/useUserDetailQuery';
import AsyncBoundary from '@/components/common/AsyncBoundary';
import Loading from '@/components/ui/Loading';
import UserProfilePanel from './components/UserProfilePanel';
import UserActivityPanel from './components/UserActivityPanel';
import { IUserDetailViewProps } from './UserDetailView';

import styles from './styles.module.scss';

/** Render inside an `AsyncBoundary` (see the route page): loading and errors are handled there. */
const UserDetailView = ({ userId }: IUserDetailViewProps) => {
  const { data: user } = useUserDetailQuery(userId);

  return (
    <div className={styles.root}>
      <UserProfilePanel user={user} />
      {/* Its own boundary: failing logs/sessions must not take the profile down with them. */}
      <AsyncBoundary compact loading={<Loading type="block" title="Loading activity" />}>
        <UserActivityPanel userId={user.id} />
      </AsyncBoundary>
    </div>
  );
};

export default UserDetailView;
