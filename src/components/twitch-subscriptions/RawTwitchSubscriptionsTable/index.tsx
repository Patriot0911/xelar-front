'use client';

import { useState, useEffect } from 'react';
import { LuTrash2, LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import Table from '@/components/ui/Table';
import ConfirmModal from '@/components/common/ConfirmModal';
import { Badge } from '@/components/shadcn/badge';
import { ITableAction, ITableColumn } from '@/components/ui/Table/Table';
import Button from '@/components/ui/buttons/Button';
import { IRawTwitchSubscription, TRawSubscriptionStatus } from '@/lib/models/twitch/twitch-subscription.model';
import useRawSubscriptionsQuery from '@/hooks/queries/twitch/useRawSubscriptionsQuery';
import useDeleteTwitchSubscriptionMutation from '@/hooks/mutations/twitch-subscriptions/useDeleteTwitchSubscriptionMutation';

import styles from './styles.module.scss';

const statusVariant = (status: TRawSubscriptionStatus): 'success' | 'warning' | 'destructive' => {
  if (status === 'enabled') return 'success';
  if (status.includes('pending')) return 'warning';
  return 'destructive';
};

const columns: ITableColumn<IRawTwitchSubscription>[] = [
  {
    key: 'event',
    title: 'Event',
    render: (row) => <code className={styles.code}>{row.event}</code>,
  },
  {
    key: 'status',
    title: 'Status',
    render: (row) => (
      <Badge variant={statusVariant(row.status)}>
        {row.status}
      </Badge>
    ),
  },
  {
    key: 'local',
    title: 'Local record',
    render: (row) => row.isOrphaned
      ? <Badge variant="destructive">orphaned</Badge>
      : <span className={styles.localId} title={row.localEntity!.id}>
          @{row.localEntity!.streamerLogin ?? row.localEntity!.streamerId}
        </span>,
  },
  {
    key: 'condition',
    title: 'Condition',
    render: (row) => (
      <span className={styles.condition}>
        {Object.entries(row.condition).map(([k, v]) => `${k}: ${v}`).join(', ')}
      </span>
    ),
  },
  {
    key: 'cost',
    title: 'Cost',
    render: (row) => String(row.cost),
    align: 'right',
  },
  {
    key: 'createdAt',
    title: 'Created',
    render: (row) => new Date(row.createdAt).toLocaleDateString(),
  },
];

const RawTwitchSubscriptionsTable = () => {
  const [clientId, setClientId] = useState('');
  const [submittedClientId, setSubmittedClientId] = useState('');
  const [cursorStack, setCursorStack] = useState<(string | undefined)[]>([undefined]);
  const [cursorIndex, setCursorIndex] = useState(0);

  const currentCursor = cursorStack[cursorIndex];
  const { data, isLoading } = useRawSubscriptionsQuery({
    clientId: submittedClientId,
    after: currentCursor,
  });

  const deleteMutation = useDeleteTwitchSubscriptionMutation();
  const [selected, setSelected] = useState<IRawTwitchSubscription | undefined>();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleSearch = () => {
    setCursorStack([undefined]);
    setCursorIndex(0);
    setSubmittedClientId(clientId.trim());
  };

  const handleNextPage = () => {
    if (!data?.meta.cursor) return;
    const next = [...cursorStack];
    next[cursorIndex + 1] = data.meta.cursor;
    setCursorStack(next);
    setCursorIndex(cursorIndex + 1);
  };

  const handlePrevPage = () => {
    if (cursorIndex === 0) return;
    setCursorIndex(cursorIndex - 1);
  };

  const handleDeleteAction = (row: IRawTwitchSubscription) => {
    setSelected(row);
    setIsConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (!selected) return;
    deleteMutation.mutate({ subscriptionId: selected.subscriptionId, clientId: submittedClientId });
  };

  useEffect(() => {
    if (!deleteMutation.isSuccess) return;
    setIsConfirmOpen(false);
  }, [deleteMutation.isSuccess]);

  useEffect(() => {
    if (isConfirmOpen) return;
    setSelected(undefined);
  }, [isConfirmOpen]);

  const actions: ITableAction<IRawTwitchSubscription>[] = [
    {
      key: 'delete',
      icon: <LuTrash2 size={13} />,
      label: 'Revoke subscription',
      variant: 'danger',
      disabled: (row) => !row.isOrphaned,
      onClick: handleDeleteAction,
    },
  ];

  const deleteDescription = selected?.isOrphaned
    ? `This will revoke the Twitch subscription (${selected.subscriptionId}) directly. No local record exists.`
    : `This subscription has a local entity — use the Local tab to delete it properly.`;

  return (
    <>
      <ConfirmModal
        title="Revoke Twitch Subscription"
        description={deleteDescription}
        isOpen={isConfirmOpen}
        isLoading={deleteMutation.isPending}
        onCancel={() => setIsConfirmOpen(false)}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
      />

      <div className={styles.toolbar}>
        <input
          className={styles.clientInput}
          placeholder="Enter Twitch App clientId…"
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <Button onClick={handleSearch} disabled={!clientId.trim()}>
          Load
        </Button>
      </div>

      {data && (
        <div className={styles.meta}>
          <span>Total: <strong>{data.meta.total}</strong></span>
          <span>Cost: <strong>{data.meta.totalCost}</strong> / {data.meta.maxTotalCost}</span>
        </div>
      )}

      <Table<IRawTwitchSubscription>
        columns={columns}
        data={data?.items ?? []}
        rowKey="subscriptionId"
        isLoading={isLoading}
        skeletonRows={10}
        actions={actions}
        emptyText={submittedClientId ? 'No subscriptions found for this app' : 'Enter a clientId to load subscriptions'}
      >
        <Table.Header />
        <Table.Body />
      </Table>

      {submittedClientId && (
        <div className={styles.pagination}>
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<LuChevronLeft size={14} />}
            disabled={cursorIndex === 0}
            onClick={handlePrevPage}
          >
            Prev
          </Button>
          <Button
            variant="secondary"
            size="sm"
            rightIcon={<LuChevronRight size={14} />}
            disabled={!data?.meta.cursor}
            onClick={handleNextPage}
          >
            Next
          </Button>
        </div>
      )}
    </>
  );
};

export default RawTwitchSubscriptionsTable;
