import { LuCopyPlus, LuPencil, LuTrash2 } from 'react-icons/lu';
import Table from '@/components/ui/Table';
import TablePagination from '@/components/ui/Table/TablePagination';
import { ITableAction, ITableColumn } from '@/components/ui/Table/Table';
import { IWebhookNotificationModel } from '@/lib/models/discord';
import { GUILD_NOTIFICATIONS_PAGE_SIZE } from '@/lib/constants/guild-notifications';
import { formatDateTime } from '@/lib/utils';
import StreamerCell from '@/components/discord/StreamerCell';
import GameFiltersCell from '@/components/discord/GameFiltersCell';
import { IWebhookNotificationsTableProps } from './WebhookNotificationsTable';

import styles from './styles.module.scss';

const columns: ITableColumn<IWebhookNotificationModel>[] = [
  {
    key: 'streamer',
    title: 'Streamer',
    render: (row) => <StreamerCell streamer={row.streamerEvent?.streamer} />,
  },
  {
    key: 'event',
    title: 'Event',
    render: (row) => <span className={styles.mono}>{row.streamerEvent?.event ?? '—'}</span>,
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
    key: 'createdAt',
    title: 'Created',
    render: (row) => <span className={styles.mono}>{formatDateTime(row.createdAt)}</span>,
  },
];

const WebhookNotificationsTable = ({
  data,
  isLoading,
  page,
  onPageChange,
  emptyText,
  onEdit,
  onDelete,
  onDuplicate,
}: IWebhookNotificationsTableProps) => {
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
        data={data?.items ?? []}
        rowKey="id"
        isLoading={isLoading}
        skeletonRows={page !== undefined ? GUILD_NOTIFICATIONS_PAGE_SIZE : 3}
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
