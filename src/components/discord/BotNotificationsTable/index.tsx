'use client';

import { useMemo } from 'react';
import { LuCopyPlus, LuPencil, LuTrash2 } from 'react-icons/lu';
import Table from '@/components/ui/Table';
import TablePagination from '@/components/ui/Table/TablePagination';
import { ITableAction, ITableColumn } from '@/components/ui/Table/Table';
import { IDiscordBotNotificationModel } from '@/lib/models/discord';
import { GUILD_NOTIFICATIONS_PAGE_SIZE } from '@/lib/constants/guild-notifications';
import { cn, formatDateTime } from '@/lib/utils';
import StreamerCell from '@/components/discord/StreamerCell';
import ChannelCell from '@/components/discord/ChannelCell';
import GameFiltersCell from '@/components/discord/GameFiltersCell';
import { IBotNotificationsTableProps } from './BotNotificationsTable';

import styles from './styles.module.scss';

const getColumns = (guildId?: string): ITableColumn<IDiscordBotNotificationModel>[] => [
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
    key: 'channel',
    title: 'Channel',
    render: (row) => <ChannelCell guildId={row.guild?.discordGuildId ?? guildId ?? ''} channelId={row.channelId} />,
  },
  {
    key: 'status',
    title: 'Status',
    render: (row) => <span className={cn(styles.status, styles[row.status])}>{row.status}</span>,
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

const BotNotificationsTable = ({
  guildId,
  data,
  isLoading,
  page,
  onPageChange,
  emptyText,
  onEdit,
  onDelete,
  onDuplicate,
}: IBotNotificationsTableProps) => {
  const columns = useMemo(() => getColumns(guildId), [guildId]);

  const actions: ITableAction<IDiscordBotNotificationModel>[] = [
    ...(onDuplicate
      ? [{ key: 'duplicate', icon: <LuCopyPlus size={13} />, label: 'Duplicate', variant: 'primary' as const, onClick: onDuplicate }]
      : []),
    { key: 'edit', icon: <LuPencil size={13} />, label: 'Edit', variant: 'primary', onClick: onEdit },
    { key: 'delete', icon: <LuTrash2 size={13} />, label: 'Delete', variant: 'danger', onClick: onDelete },
  ];

  return (
    <div className={styles.root}>
      <Table<IDiscordBotNotificationModel>
        columns={columns}
        actions={actions}
        data={data?.items ?? []}
        rowKey="id"
        isLoading={isLoading}
        {...(page !== undefined ? { pageSize: GUILD_NOTIFICATIONS_PAGE_SIZE } : { skeletonRows: 3 })}
        emptyText={emptyText ?? 'No bot message notifications yet'}
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

export default BotNotificationsTable;
