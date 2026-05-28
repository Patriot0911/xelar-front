'use client';

import useTwitchAppsQuery from '@/hooks/queries/twitch/useListTwitchAppsQuery';
import { ITwitchAppShortModel } from '@/lib/models/twitch/twitch-app.model';
import { ITableColumn } from '@/components/ui/Table/Table';
import EditTwitchAppModal from '../EditTwitchAppModal';
import Table from '@/components/ui/Table';
import TablePagination from '@/components/ui/Table/TablePagination';
import { useState } from 'react';

import styles from './styles.module.scss';

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

  const handleRowClick = (row: ITwitchAppShortModel) => {
    setSelectedAppId(row.id);
    setIsOpen(true);
  }

  return (
    <>
      <EditTwitchAppModal
        appId={selectedAppId}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <Table<ITwitchAppShortModel>
        columns={appColumns}
        data={data?.items ?? []}
        rowKey={'id'}
        isLoading={isLoading}
        skeletonRows={PAGE_SIZE}
        onRowClick={handleRowClick}
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
