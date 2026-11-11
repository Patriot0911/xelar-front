'use client';

import { useMemo } from 'react';
import { LuCopyPlus, LuPencil, LuTrash2 } from 'react-icons/lu';
import Table from '@/components/ui/Table';
import TablePagination from '@/components/ui/Table/TablePagination';
import { ITableAction, ITableColumn } from '@/components/ui/Table/Table';
import { IWebhookNotificationModel } from '@/lib/models/discord';
import { GUILD_NOTIFICATIONS_PAGE_SIZE } from '@/lib/constants/guild-notifications';
import { getTwitchEventLabel } from '@/lib/constants/notifications';
import useTableColumns from '@/hooks/shared/useTableColumns';
import { formatDate, formatDateTime } from '@/lib/utils';
import StreamerCell from '@/components/discord/StreamerCell';
import GameFiltersCell from '@/components/discord/GameFiltersCell';
import GuildCell from '@/components/discord/GuildCell';
import { IWebhookNotificationsTableProps } from './WebhookNotificationsTable';

import styles from './styles.module.scss';

const getColumns = (showGuild?: boolean): ITableColumn<IWebhookNotificationModel>[] => [
  {
    key: 'streamer',
    title: 'Streamer',
    render: (row) => <StreamerCell streamer={row.streamerEvent?.streamer} />,
    hideable: false,
  },
  ...(showGuild
    ? [{
      key: 'guild',
      title: 'Server',
      render: (row: IWebhookNotificationModel) => <GuildCell guild={row.guild} />,
    }]
    : []),
  {
    key: 'event',
    title: 'Event',
    render: (row) => getTwitchEventLabel(row.streamerEvent?.event),
  },
  {
    key: 'type',
    title: 'Type',
    render: (row) => <span className={styles.status}>{row.type}</span>,
  },
  {
    key: 'games',
    title: 'Games',
    render: (row) => <GameFiltersCell gameFilters={row.gameFilters} />,
  },
  {
    key: 'lastSentAt',
    title: 'Last sent',
    render: (row) => (row.lastSentAt
      ? <time className={styles.mono} dateTime={row.lastSentAt} title={formatDateTime(row.lastSentAt)}>{formatDate(row.lastSentAt)}</time>
      : <span className={styles.muted}>Never</span>),
  },
  {
    key: 'createdAt',
    title: 'Created',
    render: (row) => <span className={styles.mono}>{formatDateTime(row.createdAt)}</span>,
  },
];

const WebhookNotificationsTable = ({
  showGuild,
  data,
  isLoading,
  page,
  onPageChange,
  emptyText,
  columnsStorageKey,
  onEdit,
  onDelete,
  onDuplicate,
}: IWebhookNotificationsTableProps) => {
  const columns = useMemo(() => getColumns(showGuild), [showGuild]);
  const columnsVisibility = useTableColumns(columnsStorageKey, columns);
  const actions: ITableAction<IWebhookNotificationModel>[] = [
    ...(onDuplicate
      ? [{ key: 'duplicate', icon: <LuCopyPlus size={13} />, label: 'Duplicate', variant: 'primary' as const, onClick: onDuplicate }]
      : []),
    { key: 'edit', icon: <LuPencil size={13} />, label: 'Edit', variant: 'primary', onClick: onEdit },
    { key: 'delete', icon: <LuTrash2 size={13} />, label: 'Delete', variant: 'danger', onClick: onDelete },
  ];

  return (
    <div className={styles.root}>
      <Table<IWebhookNotificationModel>
        columns={columns}
        actions={actions}
        columnsVisibility={columnsVisibility}
        data={data?.items ?? []}
        rowKey="id"
        isLoading={isLoading}
        {...(page !== undefined ? { pageSize: GUILD_NOTIFICATIONS_PAGE_SIZE } : { skeletonRows: 3 })}
        emptyText={emptyText ?? 'No webhook notifications yet'}
      >
        <Table.Header />
        <Table.Body />
      </Table>
      {page !== undefined && onPageChange && (
        <TablePagination
          page={page}
          pageSize={GUILD_NOTIFICATIONS_PAGE_SIZE}
          total={data?.meta.count ?? 0}
          onChange={onPageChange}
        />
      )}
    </div>
  );
};

export default WebhookNotificationsTable;
