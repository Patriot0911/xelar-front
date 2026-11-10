'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LuSearch } from 'react-icons/lu';
import { ITableColumn } from '@/components/ui/Table/Table';
import Table from '@/components/ui/Table';
import TablePagination from '@/components/ui/Table/TablePagination';
import Input from '@/components/ui/Input';
import useStreamersQuery from '@/hooks/queries/streamers/useStreamersQuery';
import { STREAMERS_DEFAULT_PAGE_SIZE } from '@/lib/constants/streamers';
import { IStreamerListItem } from '@/lib/models/streamers/streamer.model';
import styles from './styles.module.scss';

function StreamerCell({ streamer }: { streamer: IStreamerListItem }) {
  return (
    <div className={styles.nameCell}>
      {streamer.profileImageUrl ? (
        <img src={streamer.profileImageUrl} alt={streamer.displayName} className={styles.avatarImg} width={32} height={32} />
      ) : (
        <div className={styles.avatar}>{streamer.displayName.slice(0, 2)}</div>
      )}
      <div className={styles.nameMeta}>
        <span className={styles.displayName}>{streamer.displayName}</span>
        <span className={styles.login}>{streamer.twitchLogin}</span>
      </div>
    </div>
  );
}

function FlagsCell({ streamer }: { streamer: IStreamerListItem }) {
  return (
    <div className={styles.flags}>
      {streamer.isPartner && <span className={styles.flag} data-flag="partner">Partner</span>}
      {streamer.isInternal && <span className={styles.flag} data-flag="internal">Internal</span>}
      {!streamer.isPartner && !streamer.isInternal && <span className={styles.noFlags}>—</span>}
    </div>
  );
}

const columns: ITableColumn<IStreamerListItem>[] = [
  {
    key: 'displayName',
    title: 'Streamer',
    render: (streamer) => <StreamerCell streamer={streamer} />,
  },
  {
    key: 'flags',
    title: 'Flags',
    render: (streamer) => <FlagsCell streamer={streamer} />,
  },
  {
    key: 'twitch',
    title: 'Personal Subs',
    render: (streamer) => (
      <span className={styles.twitchCell} data-enabled={String(streamer.allowPersonalSubscriptions)}>
        {streamer.allowPersonalSubscriptions ? 'Allowed' : 'Disabled'}
      </span>
    ),
  },
  {
    key: 'linkedUser',
    title: 'Linked Account',
    render: (streamer) => (
      streamer.linkedUserId
        ? <span className={styles.linked}>Linked</span>
        : <span className={styles.noRoles}>Not linked</span>
    ),
  },
  {
    key: 'createdAt',
    title: 'Added',
    render: (streamer) => new Date(streamer.createdAt).toLocaleDateString(),
  },
];

export function StreamersTable() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const { data, isLoading } = useStreamersQuery({ page, pageSize: STREAMERS_DEFAULT_PAGE_SIZE, search: search || undefined });

  return (
    <>
      <div className={styles.toolbar}>
        <Input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder="Search by name or login…"
          autoComplete="off"
          hideOptionalFlag
          className={styles.searchWrap}
          icon={<LuSearch size={14} />}
        />
      </div>

      <Table<IStreamerListItem>
        columns={columns}
        data={data?.items ?? []}
        rowKey="id"
        isLoading={isLoading}
        pageSize={STREAMERS_DEFAULT_PAGE_SIZE}
        emptyText="No streamers found"
        onRowClick={(streamer) => router.push(`/dashboard/streamers/${streamer.id}`)}
      >
        <Table.Header />
        <Table.Body />
      </Table>
      <div className={styles.paginatorWrapper}>
        <TablePagination
          page={page}
          pageSize={STREAMERS_DEFAULT_PAGE_SIZE}
          total={data?.meta.count ?? 0}
          onChange={setPage}
        />
      </div>
    </>
  );
}
