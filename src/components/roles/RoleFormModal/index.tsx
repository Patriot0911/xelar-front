'use client';

import { useState, useEffect } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { LuShieldCheck, LuX, LuCheck, LuPlus } from 'react-icons/lu';
import { IRoleListItem, ICreateRolePayload } from '@/lib/models/roles/role.model';
import { Permission, PERMISSION_LABELS, ALL_PERMISSIONS } from '@/lib/constants/permissions';
import useCreateRoleMutation from '@/hooks/mutations/roles/useCreateRoleMutation';
import useEditRoleMutation from '@/hooks/mutations/roles/useEditRoleMutation';
import styles from './styles.module.scss';

const DEFAULT_PRIORITY = 1;

interface RoleFormModalProps {
  role?: IRoleListItem;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function PermissionToggle({
  permission,
  checked,
  onChange,
}: {
  permission: Permission;
  checked: boolean;
  onChange: (p: Permission, checked: boolean) => void;
}) {
  return (
    <button
      type="button"
      className={`${styles.permToggle} ${checked ? styles.permToggleActive : ''}`}
      onClick={() => onChange(permission, !checked)}
      aria-pressed={checked}
    >
      <span className={`${styles.permCheckbox} ${checked ? styles.permCheckboxChecked : ''}`}>
        {checked && <LuCheck size={10} strokeWidth={3} />}
      </span>
      <span className={styles.permLabel}>{PERMISSION_LABELS[permission]}</span>
      <span className={styles.permKey}>{permission}</span>
    </button>
  );
}

function buildInitialForm(role?: IRoleListItem) {
  return {
    name: role?.name ?? '',
    rolePriority: role?.rolePriority ?? DEFAULT_PRIORITY,
    permissions: role?.permissions ?? [] as Permission[],
  };
}

export function RoleFormModal({ role, open, onOpenChange }: RoleFormModalProps) {
  const isEdit = Boolean(role);

  const [form, setForm] = useState(() => buildInitialForm(role));
  const [nameError, setNameError] = useState('');

  const createMutation = useCreateRoleMutation();
  const editMutation = useEditRoleMutation();

  const isPending = createMutation.isPending || editMutation.isPending;

  useEffect(() => {
    if (open) {
      setForm(buildInitialForm(role));
      setNameError('');
    }
  }, [open, role]);

  function handlePermissionChange(permission: Permission, checked: boolean) {
    setForm((prev) => ({
      ...prev,
      permissions: checked
        ? [...prev.permissions, permission]
        : prev.permissions.filter((p) => p !== permission),
    }));
  }

  function validate(): boolean {
    if (form.name.trim().length < 3) {
      setNameError('Name must be at least 3 characters.');
      return false;
    }
    setNameError('');
    return true;
  }

  function handleSubmit() {
    if (!validate()) return;

    const payload: ICreateRolePayload = {
      name: form.name.trim(),
      permissions: form.permissions,
      rolePriority: form.rolePriority,
    };

    if (isEdit && role) {
      editMutation.mutate(
        { id: role.id, payload },
        { onSuccess: () => onOpenChange(false) },
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => onOpenChange(false),
      });
    }
  }

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className={styles.veil} />
        <DialogPrimitive.Content
          className={styles.modal}
          aria-describedby={undefined}
        >
          <header className={styles.header}>
            <div className={styles.headerMark}>
              <LuShieldCheck size={20} />
            </div>
            <div className={styles.headerMeta}>
              <div className={styles.headerEyebrow}>Access control · Roles</div>
              <DialogPrimitive.Title className={styles.headerTitle}>
                {isEdit ? 'Edit Role' : 'Create Role'}
              </DialogPrimitive.Title>
              <p className={styles.headerSub}>
                {isEdit
                  ? 'Update the role name, priority, or permission set.'
                  : 'Define a new role with a name, priority level, and permissions.'}
              </p>
            </div>
            <button
              type="button"
              className={styles.closeBtn}
              onClick={() => onOpenChange(false)}
              aria-label="Close"
            >
              <LuX size={16} />
            </button>
          </header>

          <div className={styles.body}>
            {/* Name */}
            <div className={styles.field}>
              <div className={styles.fieldLabel}>Name</div>
              <div className={`${styles.fieldInput} ${nameError ? styles.fieldInputError : ''}`}>
                <input
                  value={form.name}
                  onChange={(e) => {
                    setForm((p) => ({ ...p, name: e.target.value }));
                    if (nameError) setNameError('');
                  }}
                  placeholder="e.g. Moderator"
                  autoFocus
                />
              </div>
              {nameError && <span className={styles.fieldError}>{nameError}</span>}
              <span className={styles.fieldHint}>Unique display name. Minimum 3 characters.</span>
            </div>

            {/* Priority */}
            <div className={styles.field}>
              <div className={styles.fieldLabel}>
                Role Priority
                <span className={styles.fieldHintInline}>0 – 256</span>
              </div>
              <div className={styles.fieldInput}>
                <input
                  type="number"
                  min={0}
                  max={256}
                  value={form.rolePriority}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      rolePriority: Math.min(256, Math.max(0, Number(e.target.value))),
                    }))
                  }
                  placeholder="1"
                />
              </div>
              <span className={styles.fieldHint}>
                Higher value = higher authority. You can only assign permissions you own.
              </span>
            </div>

            {/* Permissions */}
            <div className={styles.field}>
              <div className={styles.fieldLabel}>
                Permissions
                {form.permissions.length > 0 && (
                  <span className={styles.fieldCount}>{form.permissions.length} selected</span>
                )}
              </div>
              <div className={styles.permsGrid}>
                {ALL_PERMISSIONS.map((p) => (
                  <PermissionToggle
                    key={p}
                    permission={p}
                    checked={form.permissions.includes(p)}
                    onChange={handlePermissionChange}
                  />
                ))}
              </div>
            </div>
          </div>

          <footer className={styles.footer}>
            <button
              type="button"
              className={styles.btnGhost}
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </button>
            <button
              type="button"
              className={styles.btnPrimary}
              onClick={handleSubmit}
              disabled={isPending}
            >
              {isPending ? (
                'Saving…'
              ) : isEdit ? (
                'Save Changes'
              ) : (
                <><LuPlus size={14} />Create Role</>
              )}
            </button>
          </footer>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
