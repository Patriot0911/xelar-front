'use client';

import type { ReactNode } from 'react';
import { Avatar } from '@/components/ui/avatar';
import useMeQuery from '@/hooks/queries/auth/useMeQuery';
import styles from './styles.module.scss';

interface DashboardTopBarProps {
  title: string;
  action?: ReactNode;
}

export function DashboardTopBar({ title, action }: DashboardTopBarProps) {
  const { data: meData } = useMeQuery();
  const displayName = meData?.displayName ?? 'User';

  return (
    <div className={styles.topBar}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.right}>
        {action}
        <div className={styles.userChip}>
          <Avatar initials={displayName} size="xs" />
          {displayName}
        </div>
      </div>
    </div>
  );
}
