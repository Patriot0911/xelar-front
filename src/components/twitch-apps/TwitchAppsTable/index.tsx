'use client';

import useTwitchAppsQuery from '@/hooks/queries/twitch/useListTwitchAppsQuery';
import { ITwitchAppShortModel } from '@/lib/models/twitch/twitch-app.model';
import { ITableColumn } from '@/components/ui/Table/Table';
import EditTwitchAppModal from '../EditTwitchAppModal';
import Table from '@/components/ui/Table';
import { useEffect, useState } from 'react';

import styles from './styles.module.scss';

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
  const { data, isLoading } = useTwitchAppsQuery();
  const [SelectedAppId, setSelectedAppId] = useState<string | undefined>();
  const [isOpen, setIsOpen] = useState(false);

  const handleRowClick = (row: ITwitchAppShortModel) => {
    setSelectedAppId(row.id);
    setIsOpen(true);
  }

  useEffect(
    () => {
      console.log({ apps: data })
    }, [data]
  );

  return (
    <>
      <EditTwitchAppModal
        appId={SelectedAppId}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <Table<ITwitchAppShortModel>
        columns={appColumns}
        data={data?.items ?? []}
        rowKey={'id'}
        isLoading={isLoading}
        onRowClick={handleRowClick}
      >
        <Table.Header />
        <Table.Body />
      </Table>
    </>
  );
}

export default TwitchAppsTable;
