import { LuPencil, LuTrash2 } from 'react-icons/lu';
import type { ITableAction, ITableColumn } from '@/components/ui/Table/Table';
import type { IWebhookNotificationModel, IStreamerRef } from '@/lib/models/discord';
import Table from '@/components/ui/Table';
import avatarStyles from './StreamerCell.module.scss';
import styles from './styles.module.scss';

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

const columns: ITableColumn<IWebhookNotificationModel>[] = [
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
    key: 'type',
    title: 'Type',
    dataBind: 'type',
  },
  {
    key: 'createdAt',
    title: 'Created At',
    render: (row) => new Date(row.createdAt).toLocaleDateString(),
  },
];

interface IWebhookNotificationsListProps {
  items: IWebhookNotificationModel[];
  onEdit: (item: IWebhookNotificationModel) => void;
  onDelete: (item: IWebhookNotificationModel) => void;
}

const WebhookNotificationsList = ({ items, onEdit, onDelete }: IWebhookNotificationsListProps) => {
  const actions: ITableAction<IWebhookNotificationModel>[] = [
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
        <p>No Webhook notifications yet.</p>
      </div>
    );
  }

  return (
    <Table<IWebhookNotificationModel>
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

export default WebhookNotificationsList;
