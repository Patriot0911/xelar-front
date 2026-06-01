'use client';

import useTwitchAppsQuery from '@/hooks/queries/twitch/useListTwitchAppsQuery';
import { ITwitchAppShortModel } from '@/lib/models/twitch/twitch-app.model';
import { ITableAction, ITableColumn } from '@/components/ui/Table/Table';
import TablePagination from '@/components/ui/Table/TablePagination';
import EditTwitchAppModal from '../EditTwitchAppModal';
import { LuPencil, LuTrash2 } from 'react-icons/lu';
import Table from '@/components/ui/Table';
import { useEffect, useState } from 'react';

import styles from './styles.module.scss';
import ConfirmModal from '@/components/common/ConfirmModal';
import DeleteTwitchApp from '../DeleteTwitchApp';

const PAGE_SIZE = 10;

const appColumns: ITableColumn<ITwitchAppShortModel>[] = [
  {
    key: 'name',
    title: 'Name',
    dataBind: 'name',
  },
  {
    key: 'clientID',
    title: 'ClientID',
    dataBind: 'clientId',
  },
  {
    key: 'createdAt',
    title: 'Created At',
    render: (row) =>
      (new Date(row.createdAt).toLocaleDateString()),
  },
];

const TwitchAppsTable = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useTwitchAppsQuery({ page, pageSize: PAGE_SIZE });
  const [selectedAppId, setSelectedAppId] = useState<string | undefined>();
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const editApp = (row: ITwitchAppShortModel) => {
    setSelectedAppId(row.id);
    setIsOpen(true);
  }

  const handleDeleteAction = (row: ITwitchAppShortModel) => {
    setSelectedAppId(row.id);
    setIsConfirmOpen(true);
  }

  const appActions: ITableAction<ITwitchAppShortModel>[] = [
    {
      key: 'edit',
      icon: <LuPencil size={13} />,
      label: 'Edit app',
      onClick: editApp,
    },
    {
      key: 'delete',
      icon: <LuTrash2 size={13} />,
      label: 'Delete app',
      variant: 'danger',
      onClick: handleDeleteAction,
    },
  ];

  useEffect(() => {
    if (isConfirmOpen) return;
    setSelectedAppId(undefined);
  }, [isConfirmOpen]);

  return (
    <>
      <EditTwitchAppModal
        appId={selectedAppId}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <DeleteTwitchApp
        appId={selectedAppId}
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
      />
      <Table<ITwitchAppShortModel>
        columns={appColumns}
        data={data?.items ?? []}
        rowKey={'id'}
        isLoading={isLoading}
        skeletonRows={PAGE_SIZE}
        actions={appActions}
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
}

export default TwitchAppsTable;
