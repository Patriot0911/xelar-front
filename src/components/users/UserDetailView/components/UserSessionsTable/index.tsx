'use client';

import { LuLogOut } from 'react-icons/lu';
import useDeleteUserSessionMutation from '@/hooks/mutations/users/useDeleteUserSessionMutation';
import useUserSessionsQuery from '@/hooks/queries/users/useUserSessionsQuery';
import Table from '@/components/ui/Table';
import { ITableAction, ITableColumn } from '@/components/ui/Table/Table';
import { IUserSession } from '@/lib/models/users/user.model';
import { formatDateTime } from '@/lib/utils';
import { IUserSessionsTableProps } from './UserSessionsTable';

import styles from './styles.module.scss';

const SESSION_SKELETON_ROWS = 3;

const columns: ITableColumn<IUserSession>[] = [
  {
    key: 'id',
    title: 'Session',
    render: (session) => <span className={styles.id} title={session.id}>{session.id.slice(0, 8)}</span>,
  },
  {
    key: 'createdAt',
    title: 'Created',
    render: (session) => <span className={styles.date}>{formatDateTime(session.createdAt)}</span>,
  },
  {
    key: 'expiresAt',
    title: 'Expires',
    render: (session) => <span className={styles.date}>{formatDateTime(session.expiresAt)}</span>,
  },
];

const UserSessionsTable = ({ userId }: IUserSessionsTableProps) => {
  const { data: sessions = [], isLoading } = useUserSessionsQuery(userId);
  const deleteMutation = useDeleteUserSessionMutation();

  const actions: ITableAction<IUserSession>[] = [
    {
      key: 'revoke',
      icon: <LuLogOut size={14} />,
      label: 'Terminate session',
      variant: 'danger',
      disabled: () => deleteMutation.isPending,
      onClick: (session) => deleteMutation.mutate({ userId, sessionId: session.id }),
    },
  ];

  return (
    <Table<IUserSession>
      columns={columns}
      actions={actions}
      data={sessions}
      rowKey="id"
      isLoading={isLoading}
      skeletonRows={SESSION_SKELETON_ROWS}
      emptyText="No active sessions"
    >
      <Table.Header />
      <Table.Body />
    </Table>
  );
};

export default UserSessionsTable;
