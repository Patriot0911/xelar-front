'use client';

import { useState } from 'react';
import useGuildNotificationLogsQuery from '@/hooks/queries/useGuildNotificationLogsQuery';
import Table from '@/components/ui/Table';
import TablePagination from '@/components/ui/Table/TablePagination';
import type { INotificationLogModel } from '@/lib/models/notification-log.model';
import type { ITableColumn } from '@/components/ui/Table/Table';
import { cn, formatDateTime } from '@/lib/utils';
import {
  getTwitchEventLabel,
  NOTIFICATION_LOG_STATUS_LABELS,
  NOTIFICATION_LOG_TYPE_LABELS,
} from '@/lib/constants/notifications';

import styles from './styles.module.scss';

const PAGE_SIZE = 20;

// User-facing view: delivery outcome only. `errorMessage` / `requestPayload` are deliberately not shown —
// they may hold internal details; admins see them in the user / streamer logs.
const columns: ITableColumn<INotificationLogModel>[] = [
  {
    key: 'createdAt',
    title: 'Time',
    render: (row) => <time dateTime={row.createdAt}>{formatDateTime(row.createdAt)}</time>,
  },
  {
    key: 'streamerLogin',
    title: 'Streamer',
    dataBind: 'streamerLogin',
  },
  {
    key: 'eventType',
    title: 'Event',
    render: (row) => getTwitchEventLabel(row.eventType),
  },
  {
    key: 'type',
    title: 'Type',
    render: (row) => (
      <span className={cn(styles.badge, row.notificationType === 'discord' ? styles.badgeDiscord : styles.badgeWebhook)}>
        {NOTIFICATION_LOG_TYPE_LABELS[row.notificationType] ?? row.notificationType}
      </span>
    ),
  },
  {
    key: 'status',
    title: 'Status',
    render: (row) => (
      <span className={cn(styles.badge, row.status === 'sent' ? styles.badgeSent : styles.badgeFailed)}>
        {NOTIFICATION_LOG_STATUS_LABELS[row.status] ?? row.status}
      </span>
    ),
  },
];

interface IProps {
  guildId: string;
}

const GuildLogsSection = ({ guildId }: IProps) => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGuildNotificationLogsQuery(guildId, page);

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Activity Logs</h2>
        <p className={styles.sectionSub}>
          Recent notification delivery attempts for this server.
        </p>
      </div>

      <Table<INotificationLogModel>
        columns={columns}
        data={data?.items ?? []}
        rowKey="id"
        isLoading={isLoading}
        pageSize={PAGE_SIZE}
        emptyText="No activity logs yet."
      >
        <Table.Header />
        <Table.Body />
      </Table>

      <TablePagination
        page={page}
        pageSize={PAGE_SIZE}
        total={data?.meta.count ?? 0}
        onChange={setPage}
      />
    </section>
  );
};

export default GuildLogsSection;
