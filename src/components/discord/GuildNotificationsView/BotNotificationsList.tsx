import { LuPencil } from 'react-icons/lu';
import type { ITableAction, ITableColumn } from '@/components/ui/Table/Table';
import type { IDiscordBotNotificationModel } from '@/lib/models/discord';
import Table from '@/components/ui/Table';
import styles from './styles.module.scss';

const columns: ITableColumn<IDiscordBotNotificationModel>[] = [
  {
    key: 'streamer',
    title: 'Streamer',
    render: (row) => row.streamerEvent?.streamer?.displayName ?? '—',
  },
  {
    key: 'event',
    title: 'Event',
    render: (row) => row.streamerEvent?.event ?? '—',
  },
  {
    key: 'channelId',
    title: 'Channel ID',
    dataBind: 'channelId',
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
}

const BotNotificationsList = ({ items, onEdit }: IBotNotificationsListProps) => {
  const actions: ITableAction<IDiscordBotNotificationModel>[] = [
    {
      key: 'edit',
      icon: <LuPencil size={13} />,
      label: 'Edit',
      onClick: onEdit,
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
