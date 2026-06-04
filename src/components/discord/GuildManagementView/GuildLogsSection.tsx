'use client';

import { useState } from 'react';
import useGuildNotificationLogsQuery from '@/hooks/queries/useGuildNotificationLogsQuery';
import Table from '@/components/ui/Table';
import TablePagination from '@/components/ui/Table/TablePagination';
import Loading from '@/components/ui/Loading';
import type { INotificationLogModel } from '@/lib/models/notification-log.model';
import type { ITableColumn } from '@/components/ui/Table/Table';
import styles from './styles.module.scss';

const PAGE_SIZE = 20;

const columns: ITableColumn<INotificationLogModel>[] = [
  {
    key: 'createdAt',
    title: 'Time',
    render: (row) => (
      <span title={new Date(row.createdAt).toLocaleString()}>
        {new Date(row.createdAt).toLocaleString()}
      </span>
    ),
  },
  {
    key: 'streamerLogin',
    title: 'Streamer',
    dataBind: 'streamerLogin',
  },
  {
    key: 'eventType',
    title: 'Event',
    dataBind: 'eventType',
  },
  {
    key: 'type',
    title: 'Type',
    render: (row) => (
      <span className={`${styles.badge} ${row.notificationType === 'discord' ? styles.badgeDiscord : styles.badgeWebhook}`}>
        {row.notificationType}
      </span>
    ),
  },
  {
    key: 'status',
    title: 'Status',
    render: (row) => (
      <span className={`${styles.badge} ${row.status === 'sent' ? styles.badgeSent : styles.badgeFailed}`}>
        {row.status}
      </span>
    ),
  },
  {
    key: 'error',
    title: 'Error',
    render: (row) => row.errorMessage
      ? <span title={row.errorMessage} style={{ color: 'var(--ink-2)', fontSize: 12 }}>{row.errorMessage.slice(0, 60)}</span>
      : <span style={{ color: 'var(--ink-3)' }}>—</span>,
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

      {isLoading ? (
        <div className={styles.center}><Loading /></div>
      ) : !data?.items.length ? (
        <div className={styles.empty}><p>No activity logs yet.</p></div>
      ) : (
        <>
          <Table<INotificationLogModel>
            columns={columns}
            data={data.items}
            rowKey="id"
            isLoading={isLoading}
          >
            <Table.Header />
            <Table.Body />
          </Table>

          <TablePagination
            page={page}
            pageSize={PAGE_SIZE}
            total={data.meta.count}
            onChange={setPage}
          />
        </>
      )}
    </section>
  );
};

export default GuildLogsSection;
