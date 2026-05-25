'use client';

import { useState } from 'react';
import { LuPlus } from 'react-icons/lu';
import PageHeader from '@/components/ui/PageHeader';
import useRolesQuery from '@/hooks/queries/roles/useRolesQuery';
import useDeleteRoleMutation from '@/hooks/mutations/roles/useDeleteRoleMutation';
import { IRoleListItem } from '@/lib/models/roles/role.model';
import { ROLES_DEFAULT_PAGE_SIZE } from '@/lib/constants/roles';
import styles from './page.module.scss';
import { RolesTable } from '@/components/modules/roles/RolesTable';
import { RoleFormModal } from '@/components/modules/roles/RoleFormModal';

export default function RolesPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<IRoleListItem | undefined>(undefined);

  const { data, isLoading } = useRolesQuery({ pageSize: ROLES_DEFAULT_PAGE_SIZE, page: 1 });
  const deleteMutation = useDeleteRoleMutation();

  const roles = data?.items ?? [];
  const total = data?.meta.count;

  function handleOpenCreate() {
    setEditingRole(undefined);
    setModalOpen(true);
  }

  function handleOpenEdit(role: IRoleListItem) {
    setEditingRole(role);
    setModalOpen(true);
  }

  function handleDelete(role: IRoleListItem) {
    if (!confirm(`Delete role "${role.name}"?`)) return;
    deleteMutation.mutate(role.id);
  }

  return (
    <>
      <PageHeader
        eyebrow="Access control · Roles"
        title="Roles"
        count={total}
      >
        <div className={styles.pageHeadRight}>
          <button type="button" className={styles.btnPrimary} onClick={handleOpenCreate}>
            <LuPlus size={14} />
            New Role
          </button>
        </div>
      </PageHeader>

      <div className={styles.content}>
        {!isLoading && roles.length === 0 ? (
          <div className={styles.empty}>
            <p className={styles.emptyTitle}>No roles yet</p>
            <p className={styles.emptyDesc}>Create your first role to start managing access.</p>
            <button type="button" className={styles.btnPrimary} onClick={handleOpenCreate}>
              <LuPlus size={14} />
              New Role
            </button>
          </div>
        ) : (
          <RolesTable
            roles={roles}
            isLoading={isLoading}
            onEdit={handleOpenEdit}
            onDelete={handleDelete}
          />
        )}
      </div>

      <RoleFormModal
        role={editingRole}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </>
  );
}
