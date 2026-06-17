'use client';

import { useState } from 'react';
import { LuShieldCheck, LuPencil, LuTrash2 } from 'react-icons/lu';
import { IRoleListItem } from '@/lib/models/roles/role.model';
import { Permission, PERMISSION_LABELS } from '@/lib/constants/permissions';
import { ITableAction, ITableColumn } from '@/components/ui/Table/Table';
import Table from '@/components/ui/Table';
import TablePagination from '@/components/ui/Table/TablePagination';
import useRolesQuery from '@/hooks/queries/roles/useRolesQuery';
import useDeleteRoleMutation from '@/hooks/mutations/roles/useDeleteRoleMutation';
import { ROLES_DEFAULT_PAGE_SIZE } from '@/lib/constants/roles';
import CreateRoleModal from '../CreateRoleModal';
import { PermissionBadge } from '../PermissionBadge';

import styles from './styles.module.scss';
import { FaUserTie } from 'react-icons/fa';

const MAX_VISIBLE_PERMISSIONS = 3;

function PermissionsList({ permissions }: { permissions: Permission[] }) {
  const visible = permissions.slice(0, MAX_VISIBLE_PERMISSIONS);
  const overflow = permissions.length - MAX_VISIBLE_PERMISSIONS;

  return (
    <div className={styles.permsList}>
      {visible.map((p) => (
        <PermissionBadge key={p} permission={p} />
      ))}
      {overflow > 0 && (
        <span className={styles.permsOverflow}>+{overflow}</span>
      )}
    </div>
  );
}

const roleColumns: ITableColumn<IRoleListItem>[] = [
  {
    key: 'name',
    title: 'Name',
    render: (role) => (
      <div className={styles.nameCell}>
        <div className={styles.nameMark}>
          {
            role.permissions.includes(Permission.ADMIN)
            ? <LuShieldCheck size={15} />
            : <FaUserTie size={15} />
          }
        </div>
        <span className={styles.nameText}>{role.name}</span>
      </div>
    ),
  },
  {
    key: 'priority',
    title: 'Priority',
    render: (role) => (
      <span className={styles.priorityCell}>{role.rolePriority}</span>
    ),
  },
  {
    key: 'permissions',
    title: 'Permissions',
    render: (role) => <PermissionsList permissions={role.permissions} />,
  },
];

export function RolesTable() {
  const [page, setPage] = useState(1);
  const [editingRole, setEditingRole] = useState<IRoleListItem | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading } = useRolesQuery({ page, pageSize: ROLES_DEFAULT_PAGE_SIZE });
  const deleteMutation = useDeleteRoleMutation();

  function handleEdit(role: IRoleListItem) {
    setEditingRole(role);
    setIsModalOpen(true);
  }

  function handleDelete(role: IRoleListItem) {
    if (!confirm(`Delete role "${role.name}"?`)) return;
    deleteMutation.mutate(role.id);
  }

  const roleActions: ITableAction<IRoleListItem>[] = [
    {
      key: 'edit',
      icon: <LuPencil size={13} />,
      label: 'Edit role',
      onClick: handleEdit,
    },
    {
      key: 'delete',
      icon: <LuTrash2 size={13} />,
      label: 'Delete role',
      variant: 'danger',
      onClick: handleDelete,
    },
  ];

  return (
    <>
      <CreateRoleModal
        isOpen={isModalOpen}
        role={editingRole}
        onClose={() => setIsModalOpen(false)}
      />
      <Table<IRoleListItem>
        columns={roleColumns}
        actions={roleActions}
        data={data?.items ?? []}
        rowKey="id"
        isLoading={isLoading}
        skeletonRows={ROLES_DEFAULT_PAGE_SIZE}
        emptyText="No roles found"
      >
        <Table.Header />
        <Table.Body />
      </Table>
      <div className={styles['paginator-wrapper']}>
        <TablePagination
          page={page}
          pageSize={ROLES_DEFAULT_PAGE_SIZE}
          total={data?.meta.count ?? 0}
          onChange={setPage}
        />
      </div>
    </>
  );
}
