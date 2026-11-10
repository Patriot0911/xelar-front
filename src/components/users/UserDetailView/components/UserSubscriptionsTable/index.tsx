import Table from '@/components/ui/Table';
import TablePagination from '@/components/ui/Table/TablePagination';
import { ITableColumn } from '@/components/ui/Table/Table';
import StreamerCell from '@/components/discord/StreamerCell';
import GameFiltersCell from '@/components/discord/GameFiltersCell';
import { IDiscordBotNotificationModel, IWebhookNotificationModel } from '@/lib/models/discord';
import { COST_SOURCE_LABELS, NotificationCostType } from '@/lib/constants/notifications';
import { USER_SUBSCRIPTIONS_PAGE_SIZE } from '@/lib/constants/users';
import { cn, formatDateTime } from '@/lib/utils';
import { IUserSubscriptionsTableProps } from './UserSubscriptionsTable';

import styles from './styles.module.scss';

type TSubscription = IDiscordBotNotificationModel | IWebhookNotificationModel;

const CostCell = ({ row }: { row: TSubscription }) => (
  <div className={styles.cost}>
    <span>{COST_SOURCE_LABELS[row.costType as NotificationCostType] ?? row.costType}</span>
    <span className={styles.muted}>{Number(row.cost).toFixed(1)} per event</span>
  </div>
);

const StateCell = ({ row }: { row: TSubscription }) => {
  const state = row.isDisabled ? 'disabled' : ('status' in row ? row.status : 'active');
  return <span className={cn(styles.state, styles[state])}>{state}</span>;
};

const ServerCell = ({ guildId }: { guildId?: string | null }) => (
  guildId ? <span className={styles.mono} title={guildId}>{guildId}</span> : <span className={styles.muted}>Personal</span>
);

const sharedHead: ITableColumn<TSubscription>[] = [
  { key: 'streamer', title: 'Streamer', render: (row) => <StreamerCell streamer={row.streamerEvent?.streamer} /> },
  { key: 'event', title: 'Event', render: (row) => <span className={styles.mono}>{row.streamerEvent?.event ?? '—'}</span> },
];

const sharedTail: ITableColumn<TSubscription>[] = [
  { key: 'cost', title: 'Paid from', render: (row) => <CostCell row={row} /> },
  { key: 'games', title: 'Games', render: (row) => <GameFiltersCell gameFilters={row.gameFilters} /> },
  { key: 'state', title: 'State', render: (row) => <StateCell row={row} /> },
  { key: 'createdAt', title: 'Created', render: (row) => <span className={styles.mono}>{formatDateTime(row.createdAt)}</span> },
];

const BOT_COLUMNS = [
  ...sharedHead,
  {
    key: 'server',
    title: 'Server / channel',
    render: (row) => {
      const bot = row as IDiscordBotNotificationModel;
      return (
        <div className={styles.cost}>
          <ServerCell guildId={bot.guild?.discordGuildId ?? bot.guildId} />
          <span className={styles.muted}>#{bot.channelId}</span>
        </div>
      );
    },
  },
  ...sharedTail,
] as ITableColumn<IDiscordBotNotificationModel>[];

const WEBHOOK_COLUMNS = [
  ...sharedHead,
  { key: 'server', title: 'Server', render: (row) => <ServerCell guildId={(row as IWebhookNotificationModel).guild?.discordGuildId} /> },
  ...sharedTail,
] as ITableColumn<IWebhookNotificationModel>[];

/** Read-only list of the notifications a user created (admin view). */
const UserSubscriptionsTable = (props: IUserSubscriptionsTableProps) => {
  const { isLoading, page, onPageChange } = props;

  return (
    <div className={styles.root}>
      {props.type === 'bot' ? (
        <Table<IDiscordBotNotificationModel>
          columns={BOT_COLUMNS}
          data={props.data?.items ?? []}
          rowKey="id"
          isLoading={isLoading}
          skeletonRows={USER_SUBSCRIPTIONS_PAGE_SIZE}
          emptyText="No bot message subscriptions"
        >
          <Table.Header />
          <Table.Body />
        </Table>
      ) : (
        <Table<IWebhookNotificationModel>
          columns={WEBHOOK_COLUMNS}
          data={props.data?.items ?? []}
          rowKey="id"
          isLoading={isLoading}
          skeletonRows={USER_SUBSCRIPTIONS_PAGE_SIZE}
          emptyText="No webhook subscriptions"
        >
          <Table.Header />
          <Table.Body />
        </Table>
      )}
      <TablePagination
        page={page}
        pageSize={USER_SUBSCRIPTIONS_PAGE_SIZE}
        total={props.data?.meta.count ?? 0}
        onChange={onPageChange}
      />
    </div>
  );
};

export default UserSubscriptionsTable;
