'use client';

import { useState } from 'react';
import { getInitials } from '@/lib/utils';
import useMeQuery from '@/hooks/queries/auth/useMeQuery';
import ProfileModal from './ProfileModal';
import styles from './styles.module.scss';

const DashboardUserCard = () => {
  const { data: meData } = useMeQuery();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const displayName = meData?.displayName ?? 'User';

  return (
    <>
      <div
        className={styles.user}
        role="button"
        tabIndex={0}
        aria-label="Open profile settings"
        onClick={() => setIsProfileOpen(true)}
        onKeyDown={(e) => e.key === 'Enter' && setIsProfileOpen(true)}
      >
        <div className={styles.userAv}>
          {getInitials(displayName)}
        </div>
        <div className={styles.userMeta}>
          <span className={styles.userName}>{displayName}</span>
          <span className={styles['user-balance-wrapepr']}>
            {(meData?.balance ?? 0).toLocaleString()} credits
          </span>
        </div>
      </div>
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
    </>
  );
};

export default DashboardUserCard;
