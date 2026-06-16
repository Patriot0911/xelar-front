'use client';

import { useEffect } from 'react';
import { IRoleListItem, ICreateRolePayload } from '@/lib/models/roles/role.model';
import { Permission, ALL_PERMISSIONS } from '@/lib/constants/permissions';
import useCreateRoleMutation from '@/hooks/mutations/roles/useCreateRoleMutation';
import useEditRoleMutation from '@/hooks/mutations/roles/useEditRoleMutation';
import { ICreateRoleModalProps } from './CreateRoleModal';
import PermissionToggle from './PermissionToggle';
import Modal from '@/components/ui/Modal';
import { FormProvider, useForm, useController, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createRoleSchema, TCreateRoleForm } from './create-role.scheme';
import FormInput from '@/components/ui/FormInput';

import styles from './styles.module.scss';
import Button from '@/components/ui/buttons/Button';

const DEFAULT_PRIORITY = 1;

const CreateRoleModal = ({ role, ...props }: ICreateRoleModalProps) => {
  const methods = useForm<TCreateRoleForm>({
    resolver: zodResolver(createRoleSchema) as Resolver<TCreateRoleForm>,
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: buildInitialForm(role),
  });

  const createMutation = useCreateRoleMutation();
  const editMutation = useEditRoleMutation();

  const isPending = createMutation.isPending || editMutation.isPending;
  const isEdit = Boolean(role);

  const { field: permissionsField } = useController({
    name: 'permissions',
    control: methods.control,
  });

  useEffect(() => {
    if (props.isOpen) {
      methods.reset(buildInitialForm(role));
    } else {
      createMutation.reset();
      editMutation.reset();
      methods.reset();
    }
  }, [props.isOpen]);

  useEffect(() => {
    if (createMutation.isSuccess || editMutation.isSuccess) {
      props.onClose();
    }
  }, [createMutation.isSuccess, editMutation.isSuccess]);

  const handlePermissionChange = (permission: Permission, checked: boolean) => {
    const current = (permissionsField.value ?? []) as Permission[];
    permissionsField.onChange(
      checked ? [...current, permission] : current.filter((p) => p !== permission)
    );
  };

  const watchedPermissions = (permissionsField.value ?? []) as Permission[];

  const submitHandler = (data: TCreateRoleForm) => {
    const payload: ICreateRolePayload = {
      ...data,
      permissions: data.permissions as Permission[],
    };
    if (role) {
      editMutation.mutate({ id: role.id, payload });
      return;
    }
    createMutation.mutate(payload);
  };

  return (
    <Modal {...props} isLoading={isPending}>
      <Modal.ModalHeader
        category={'Access control · Roles'}
        title={isEdit ? 'Edit Role' : 'Create Role'}
        description={
          isEdit
            ? 'Update the role name, priority, or permission set.'
            : 'Define a new role with a name, priority level, and permissions.'
        }
      />
      <FormProvider {...methods}>
        <Modal.ModalBody>
          <FormInput<TCreateRoleForm>
            name="name"
            placeholder="e.g. Moderator"
            label='Name'
            hint='Unique display name. Minimum 3 characters'
            autoFocus
            hideHintOnError
            hideOptionalFlag
          />

          <FormInput<TCreateRoleForm>
            name='rolePriority'
            label='Role Priority'
            type='number'
            min={0}
            max={256}
            placeholder="1"
            hint='Higher value = higher authority. You can only assign permissions you own.'
            hideHintOnError
            hideOptionalFlag
          />

          <div className={styles.field}>
            <div className={styles.fieldLabel}>
              Permissions
              {watchedPermissions.length > 0 && (
                <span className={styles.fieldCount}> {watchedPermissions.length} selected</span>
              )}
            </div>
            <div className={styles.permsGrid}>
              {ALL_PERMISSIONS.map((p) => (
                <PermissionToggle
                  key={p}
                  permission={p as Permission}
                  checked={watchedPermissions.includes(p as Permission)}
                  onChange={handlePermissionChange}
                />
              ))}
            </div>
          </div>
        </Modal.ModalBody>
      </FormProvider>
      <Modal.ModalFooter>
        <Button type="button" variant="secondary" onClick={props.onClose}>
          Cancel
        </Button>
        <Button
          type="submit"
          className={styles.btnPrimary}
          onClick={methods.handleSubmit(submitHandler)}
          disabled={!methods.formState.isValid || createMutation.isSuccess || editMutation.isSuccess}
          isLoading={isPending}
        >
          {isEdit ? 'Save Changes' : 'Create Role'}
        </Button>
      </Modal.ModalFooter>
    </Modal>
  );
}

function buildInitialForm(role?: IRoleListItem) {
  return {
    name: role?.name ?? '',
    rolePriority: role?.rolePriority ?? DEFAULT_PRIORITY,
    permissions: role?.permissions ?? [] as Permission[],
  };
}

export default CreateRoleModal;
