'use client';

import { useState, useEffect } from 'react';
import { LuTrash2 } from 'react-icons/lu';
import Table from '@/components/ui/Table';
import TablePagination from '@/components/ui/Table/TablePagination';
import ConfirmModal from '@/components/common/ConfirmModal';
import { Badge } from '@/components/shadcn/badge';
import { ITableAction, ITableColumn } from '@/components/ui/Table/Table';
import { ITwitchLocalSubscription, TLocalEventStatus } from '@/lib/models/twitch/twitch-subscription.model';
import useListLocalSubscriptionsQuery from '@/hooks/queries/twitch/useListLocalSubscriptionsQuery';
import useDeleteLocalSubscriptionMutation from '@/hooks/mutations/twitch-subscriptions/useDeleteLocalSubscriptionMutation';

import styles from './styles.module.scss';

const PAGE_SIZE = 15;

const statusVariant: Record<TLocalEventStatus, 'success' | 'warning' | 'destructive'> = {
  verified: 'success',
  pending:  'warning',
  revoked:  'destructive',
};

const columns: ITableColumn<ITwitchLocalSubscription>[] = [
  {
    key: 'streamer',
    title: 'Streamer',
    render: (row) => row.streamer
      ? <span>{row.streamer.displayName} <span className={styles.login}>@{row.streamer.twitchLogin}</span></span>
      : <span className={styles.empty}>—</span>,
  },
  {
    key: 'event',
    title: 'Event',
    render: (row) => <code className={styles.code}>{row.event}</code>,
  },
  {
    key: 'status',
    title: 'Status',
    render: (row) => (
      <Badge variant={statusVariant[row.eventStatus]}>
        {row.eventStatus}
      </Badge>
    ),
  },
  {
    key: 'app',
    title: 'Twitch App',
    render: (row) => row.twitchApp
      ? <span title={row.twitchApp.clientId}>{row.twitchApp.name}</span>
      : <span className={styles.empty}>—</span>,
  },
  {
    key: 'cost',
    title: 'Cost',
    dataBind: 'appCost',
    align: 'right',
  },
  {
    key: 'createdAt',
    title: 'Created',
    render: (row) => new Date(row.createdAt).toLocaleDateString(),
  },
];

const TwitchSubscriptionsTable = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useListLocalSubscriptionsQuery({ page, pageSize: PAGE_SIZE });
  const deleteMutation = useDeleteLocalSubscriptionMutation();

  const [selectedId, setSelectedId] = useState<string | undefined>();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleDeleteAction = (row: ITwitchLocalSubscription) => {
    setSelectedId(row.id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (!selectedId) return;
    deleteMutation.mutate(selectedId);
  };

  useEffect(() => {
    if (!deleteMutation.isSuccess) return;
    setIsConfirmOpen(false);
  }, [deleteMutation.isSuccess]);

  useEffect(() => {
    if (isConfirmOpen) return;
    setSelectedId(undefined);
  }, [isConfirmOpen]);

  const actions: ITableAction<ITwitchLocalSubscription>[] = [
    {
      key: 'delete',
      icon: <LuTrash2 size={13} />,
      label: 'Delete subscription',
      variant: 'danger',
      onClick: handleDeleteAction,
    },
  ];

  return (
    <>
      <ConfirmModal
        title="Delete Subscription"
        description="This will remove the local subscription record and revoke it on Twitch. All linked notifications will be deleted as well."
        isOpen={isConfirmOpen}
        isLoading={deleteMutation.isPending}
        onCancel={() => setIsConfirmOpen(false)}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
      />
      <Table<ITwitchLocalSubscription>
        columns={columns}
        data={data?.items ?? []}
        rowKey="id"
        isLoading={isLoading}
        skeletonRows={PAGE_SIZE}
        actions={actions}
        emptyText="No local subscriptions found"
      >
        <Table.Header />
        <Table.Body />
      </Table>
      <div className={styles['paginator-wrapper']}>
        <TablePagination
          page={page}
          pageSize={PAGE_SIZE}
          total={data?.meta.count ?? 0}
          onChange={setPage}
        />
      </div>
    </>
  );
};

export default TwitchSubscriptionsTable;
