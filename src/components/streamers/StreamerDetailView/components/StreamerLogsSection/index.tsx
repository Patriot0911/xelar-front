'use client';

import { useMemo, useState } from 'react';
import useStreamerNotificationLogsQuery from '@/hooks/queries/streamers/useStreamerNotificationLogsQuery';
import Table from '@/components/ui/Table';
import TablePagination from '@/components/ui/Table/TablePagination';
import { ITableColumn } from '@/components/ui/Table/Table';
import { IStreamerNotificationLog } from '@/lib/models/streamers/streamer.model';
import { STREAMER_LOGS_PAGE_SIZE } from '@/lib/constants/streamers';
import { cn, formatDateTime } from '@/lib/utils';
import { IStreamerLogsSectionProps } from './StreamerLogsSection';

import styles from './styles.module.scss';

const columns: ITableColumn<IStreamerNotificationLog>[] = [
  {
    key: 'createdAt',
    title: 'Date',
    render: (log) => <span className={styles.mono}>{formatDateTime(log.createdAt)}</span>,
  },
  {
    key: 'eventType',
    title: 'Event',
    render: (log) => <span className={styles.mono}>{log.eventType}</span>,
  },
  {
    key: 'notificationType',
    title: 'Type',
    render: (log) => <span className={cn(styles.badge, styles[log.notificationType])}>{log.notificationType}</span>,
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

const StreamerLogsSection = ({ streamerId }: IStreamerLogsSectionProps) => {
  const [page, setPage] = useState(1);
  const { data: logs, isLoading } = useStreamerNotificationLogsQuery(streamerId);

  // The endpoint returns the whole list, so pages are cut here.
  const pageItems = useMemo(
    () => (logs ?? []).slice((page - 1) * STREAMER_LOGS_PAGE_SIZE, page * STREAMER_LOGS_PAGE_SIZE),
    [logs, page],
  );

  return (
    <section className={styles.section} aria-labelledby="streamer-logs-title">
      <h3 id="streamer-logs-title" className={styles.title}>Notification logs</h3>
      <div>
        <Table<IStreamerNotificationLog>
          columns={columns}
          data={pageItems}
          rowKey="id"
          isLoading={isLoading}
          pageSize={STREAMER_LOGS_PAGE_SIZE}
          emptyText="No notification logs yet"
        >
          <Table.Header />
          <Table.Body />
        </Table>
        <TablePagination
          page={page}
          pageSize={STREAMER_LOGS_PAGE_SIZE}
          total={logs?.length ?? 0}
          onChange={setPage}
        />
      </div>
    </section>
  );
};

export default StreamerLogsSection;
