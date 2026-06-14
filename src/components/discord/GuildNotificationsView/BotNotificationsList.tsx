import { LuPencil, LuTrash2 } from 'react-icons/lu';
import type { ITableAction, ITableColumn } from '@/components/ui/Table/Table';
import type { IDiscordBotNotificationModel, IStreamerRef } from '@/lib/models/discord';
import Table from '@/components/ui/Table';
import avatarStyles from './StreamerCell.module.scss';
import styles from './styles.module.scss';
import useDiscordGuildChannelsQuery from '@/hooks/queries/discord/useDiscordGuildChannelsQuery';

const StreamerCell = ({ streamer }: { streamer?: IStreamerRef }) => {
  if (!streamer) return <span>—</span>;
  return (
    <div className={avatarStyles.streamer}>
      {streamer.profileImageUrl ? (
        <img
          src={streamer.profileImageUrl}
          alt={streamer.displayName}
          className={avatarStyles.avatar}
          width={24}
          height={24}
        />
      ) : (
        <div className={avatarStyles.avatarFallback}>
          {streamer.displayName[0].toUpperCase()}
        </div>
      )}
      <span className={avatarStyles.name}>{streamer.displayName}</span>
    </div>
  );
};

const ChannelCell = ({ channelId, guildId }: { guildId: string; channelId: string; }) => {
  const { data, isLoading } = useDiscordGuildChannelsQuery(guildId);
  console.log({ data })
  const channel = data?.find(
    (c) => c.id === channelId
  )?.name ?? 'NaN';
  return (
    <span className={avatarStyles.name}>{channel}</span>
  );
};

const columns: ITableColumn<IDiscordBotNotificationModel>[] = [
  {
    key: 'streamer',
    title: 'Streamer',
    render: (row) => <StreamerCell streamer={row.streamerEvent?.streamer} />,
  },
  {
    key: 'event',
    title: 'Event',
    render: (row) => row.streamerEvent?.event ?? '—',
  },
  {
    key: 'channel',
    title: 'Channel',
    dataBind: 'channelId',
    render: (row) => <ChannelCell channelId={row.channelId} guildId={(row as any).discordGuild.guildId} />
  },
  {
    key: 'status',
    title: 'Status',
    dataBind: 'status',
  },
  {
    key: 'createdAt',
    title: 'Created At',
    render: (row) => new Date(row.createdAt).toLocaleDateString(),
  },
];

interface IBotNotificationsListProps {
  items: IDiscordBotNotificationModel[];
  onEdit: (item: IDiscordBotNotificationModel) => void;
  onDelete: (item: IDiscordBotNotificationModel) => void;
}

const BotNotificationsList = ({ items, onEdit, onDelete }: IBotNotificationsListProps) => {
  const actions: ITableAction<IDiscordBotNotificationModel>[] = [
    {
      key: 'edit',
      icon: <LuPencil size={13} />,
      label: 'Edit',
      onClick: onEdit,
    },
    {
      key: 'delete',
      icon: <LuTrash2 size={13} />,
      label: 'Delete',
      onClick: onDelete,
    },
  ];

  if (!items.length) {
    return (
      <div className={styles.empty}>
        <p>No Discord Bot notifications yet.</p>
      </div>
    );
  }

  return (
    <Table<IDiscordBotNotificationModel>
      columns={columns}
      actions={actions}
      data={items}
      rowKey="id"
      isLoading={false}
    >
      <Table.Header />
      <Table.Body />
    </Table>
  );
};

export default BotNotificationsList;
