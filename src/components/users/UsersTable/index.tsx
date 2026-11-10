'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LuUser, LuArrowRight } from 'react-icons/lu';
import { ITableColumn } from '@/components/ui/Table/Table';
import Table from '@/components/ui/Table';
import UserStatusBadge from '@/components/users/UserStatusBadge';
import SearchInput from '@/components/ui/SearchInput';
import useListSearch from '@/hooks/shared/useListSearch';
import TablePagination from '@/components/ui/Table/TablePagination';
import useUsersQuery from '@/hooks/queries/users/useUsersQuery';
import { USERS_DEFAULT_PAGE_SIZE } from '@/lib/constants/users';
import { IUserListItem } from '@/lib/models/users/user.model';

import styles from './styles.module.scss';

function RolesList({ roles }: { roles: string[] }) {
  if (!roles.length) return <span className={styles.noRoles}>No roles</span>;
  return (
    <div className={styles.rolesList}>
      {roles.map((r) => (
        <span key={r} className={styles.roleBadge}>{r}</span>
      ))}
    </div>
  );
}

const columns: ITableColumn<IUserListItem>[] = [
  {
    key: 'displayName',
    title: 'User',
    render: (user) => (
      <div className={styles.nameCell}>
        <div className={styles.avatar}>
          {user.displayName.slice(0, 2)}
        </div>
        <span className={styles.displayName}>{user.displayName}</span>
      </div>
    ),
  },
  {
    key: 'status',
    title: 'Status',
    render: (user) => <UserStatusBadge status={user.status} />,
  },
  {
    key: 'roles',
    title: 'Roles',
    render: (user) => <RolesList roles={user.roles} />,
  },
  {
    key: 'balance',
    title: 'Balance',
    render: (user) => <span>{Number(user.balance).toFixed(1)}</span>,
  },
  {
    key: 'twitch',
    title: 'Twitch',
    render: (user) => (
      <span
        className={styles.twitchCell}
        data-enabled={String(user.allowPersonalSubscriptions)}
      >
        {user.allowPersonalSubscriptions ? 'Allowed' : 'Disabled'}
      </span>
    ),
  },
];

const UsersTable = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const { value, setValue, search } = useListSearch(() => setPage(1));
  const { data, isLoading, isFetching } = useUsersQuery({ page, pageSize: USERS_DEFAULT_PAGE_SIZE, search });

  return (
    <>
      <div className={styles.toolbar}>
        <SearchInput
          value={value}
          onChange={setValue}
          placeholder="Search by name, email, Discord, Twitch or ID"
          label="Search users"
          isSearching={isFetching && !isLoading}
        />
      </div>
      <Table<IUserListItem>
        columns={columns}
        data={data?.items ?? []}
        rowKey="id"
        isLoading={isLoading}
        pageSize={USERS_DEFAULT_PAGE_SIZE}
        emptyText={search ? `No users match “${search}”` : 'No users found'}
        onRowClick={(user) => router.push(`/dashboard/users/${user.id}`)}
      >
        <Table.Header />
        <Table.Body />
      </Table>
      <div className={styles.paginatorWrapper}>
        <TablePagination
          page={page}
          pageSize={USERS_DEFAULT_PAGE_SIZE}
          total={data?.meta.count ?? 0}
          onChange={setPage}
        />
      </div>
    </>
  );
};

export default UsersTable;
