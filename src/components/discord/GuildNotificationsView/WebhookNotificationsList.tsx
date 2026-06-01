import { LuPencil } from 'react-icons/lu';
import type { ITableAction, ITableColumn } from '@/components/ui/Table/Table';
import type { IWebhookNotificationModel } from '@/lib/models/discord';
import Table from '@/components/ui/Table';
import styles from './styles.module.scss';

const columns: ITableColumn<IWebhookNotificationModel>[] = [
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
}

const WebhookNotificationsList = ({ items, onEdit }: IWebhookNotificationsListProps) => {
  const actions: ITableAction<IWebhookNotificationModel>[] = [
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
