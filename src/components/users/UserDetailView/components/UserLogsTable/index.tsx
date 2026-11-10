'use client';

import { useState } from 'react';
import useUserNotificationLogsQuery from '@/hooks/queries/users/useUserNotificationLogsQuery';
import Table from '@/components/ui/Table';
import TablePagination from '@/components/ui/Table/TablePagination';
import { ITableColumn } from '@/components/ui/Table/Table';
import { IUserNotificationLog } from '@/lib/models/users/user.model';
import { USER_LOGS_PAGE_SIZE } from '@/lib/constants/users';
import { cn, formatDateTime } from '@/lib/utils';
import { IUserLogsTableProps } from './UserLogsTable';

import styles from './styles.module.scss';

const columns: ITableColumn<IUserNotificationLog>[] = [
  {
    key: 'createdAt',
    title: 'Date',
    render: (log) => <span className={styles.date}>{formatDateTime(log.createdAt)}</span>,
  },
  {
    key: 'streamerLogin',
    title: 'Streamer',
    dataBind: 'streamerLogin',
  },
  {
    key: 'eventType',
    title: 'Event',
    render: (log) => <span className={styles.mono}>{log.eventType}</span>,
  },
  {
    key: 'notificationType',
    title: 'Type',
    render: (log) => (
      <span className={cn(styles.badge, styles[log.notificationType])}>{log.notificationType}</span>
    ),
  },
  {
    key: 'status',
    title: 'Status',
    render: (log) => <span className={cn(styles.badge, styles[log.status])}>{log.status}</span>,
  },
  {
    key: 'errorMessage',
    title: 'Error',
    render: (log) => log.errorMessage
      ? <span className={styles.error} title={log.errorMessage}>{log.errorMessage}</span>
      : <span className={styles.muted}>—</span>,
  },
];

const UserLogsTable = ({ userId }: IUserLogsTableProps) => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useUserNotificationLogsQuery(userId, page);

  return (
    <div className={styles.root}>
      <Table<IUserNotificationLog>
        columns={columns}
        data={data?.items ?? []}
        rowKey="id"
        isLoading={isLoading}
        pageSize={USER_LOGS_PAGE_SIZE}
        emptyText="No notification logs yet"
      >
        <Table.Header />
        <Table.Body />
      </Table>
      <TablePagination
        page={page}
        pageSize={USER_LOGS_PAGE_SIZE}
        total={data?.meta.count ?? 0}
        onChange={setPage}
      />
    </div>
  );
};

export default UserLogsTable;
