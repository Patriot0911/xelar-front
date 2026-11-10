'use client';

import { useState } from 'react';
import { LuKeyRound, LuRadioTower, LuScrollText } from 'react-icons/lu';
import AsyncBoundary from '@/components/common/AsyncBoundary';
import SectionTabs from '@/components/ui/SectionTabs';
import { ISectionTabItem } from '@/components/ui/SectionTabs/SectionTabs';
import { USER_ACTIVITY_TAB_LABELS, UserActivityTab } from '@/lib/constants/users';
import UserLogsTable from '../UserLogsTable';
import UserSubscriptionsTab from '../UserSubscriptionsTab';
import UserSessionsTable from '../UserSessionsTable';
import { IUserActivityProps } from './UserActivity';

import styles from './styles.module.scss';

const TABS: ISectionTabItem<UserActivityTab>[] = [
  { key: UserActivityTab.Logs, label: USER_ACTIVITY_TAB_LABELS[UserActivityTab.Logs], icon: LuScrollText },
  { key: UserActivityTab.Subscriptions, label: USER_ACTIVITY_TAB_LABELS[UserActivityTab.Subscriptions], icon: LuRadioTower },
  { key: UserActivityTab.Sessions, label: USER_ACTIVITY_TAB_LABELS[UserActivityTab.Sessions], icon: LuKeyRound },
];

const UserActivity = ({ userId }: IUserActivityProps) => {
  const [tab, setTab] = useState<UserActivityTab>(UserActivityTab.Logs);

  return (
    <div className={styles.activity}>
      <SectionTabs<UserActivityTab> items={TABS} value={tab} onChange={setTab} label="User activity" />

      {/* Keyed by tab: switching tabs also clears an error shown for the previous one. */}
      <AsyncBoundary key={tab} compact loading={null}>
        <div role="tabpanel" aria-label={USER_ACTIVITY_TAB_LABELS[tab]}>
          {tab === UserActivityTab.Logs && <UserLogsTable userId={userId} />}
          {tab === UserActivityTab.Subscriptions && <UserSubscriptionsTab userId={userId} />}
          {tab === UserActivityTab.Sessions && <UserSessionsTable userId={userId} />}
        </div>
      </AsyncBoundary>
    </div>
  );
};

export default UserActivity;
