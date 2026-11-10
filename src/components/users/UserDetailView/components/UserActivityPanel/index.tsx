'use client';

import { useState } from 'react';
import useUserNotificationLogsQuery from '@/hooks/queries/users/useUserNotificationLogsQuery';
import useUserSessionsQuery from '@/hooks/queries/users/useUserSessionsQuery';
import Panel from '@/components/ui/Panel';
import Tabs from '@/components/ui/Tabs';
import AnimatedHeight from '@/components/ui/AnimatedHeight';
import { TabItem } from '@/components/ui/Tabs/Tabs';
import { USER_ACTIVITY_TAB_LABELS, UserActivityTab } from '@/lib/constants/users';
import UserLogsTable from '../UserLogsTable';
import UserSessionsTable from '../UserSessionsTable';
import { IUserActivityPanelProps } from './UserActivityPanel';

const UserActivityPanel = ({ userId }: IUserActivityPanelProps) => {
  const [tab, setTab] = useState<UserActivityTab>(UserActivityTab.Logs);
  const [logsPage, setLogsPage] = useState(1);

  // Both queries run up-front so the tab counters are filled before switching.
  const logsQuery = useUserNotificationLogsQuery(userId, logsPage);
  const sessionsQuery = useUserSessionsQuery(userId);

  const tabs: TabItem<UserActivityTab>[] = [
    {
      key: UserActivityTab.Logs,
      label: USER_ACTIVITY_TAB_LABELS[UserActivityTab.Logs],
      count: logsQuery.data?.meta.count,
    },
    {
      key: UserActivityTab.Sessions,
      label: USER_ACTIVITY_TAB_LABELS[UserActivityTab.Sessions],
      count: sessionsQuery.data?.length,
    },
  ];

  return (
    <Panel
      title="Activity"
      titleId="user-activity-title"
      actions={<Tabs<UserActivityTab> items={tabs} value={tab} onChange={setTab} />}
    >
      <AnimatedHeight>
        <div role="tabpanel" aria-label={USER_ACTIVITY_TAB_LABELS[tab]}>
          {tab === UserActivityTab.Logs ? (
            <UserLogsTable
              data={logsQuery.data}
              isLoading={logsQuery.isLoading}
              page={logsPage}
              onPageChange={setLogsPage}
            />
          ) : (
            <UserSessionsTable
              userId={userId}
              sessions={sessionsQuery.data ?? []}
              isLoading={sessionsQuery.isLoading}
            />
          )}
        </div>
      </AnimatedHeight>
    </Panel>
  );
};

export default UserActivityPanel;
