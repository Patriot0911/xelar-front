'use client';

import { useEffect, useState } from 'react';
import useSetManagerPermissionMutation from '@/hooks/mutations/discord/useSetManagerPermissionMutation';
import { MANAGER_PERMISSION_OPTIONS } from '@/lib/constants/discord-manager-permissions';
import { IManagerPermissionSelectProps } from './ManagerPermissionSelect';
import Select from '@/components/ui/Select';

const ManagerPermissionSelect = ({ guildId, managerPermission, disabled }: IManagerPermissionSelectProps) => {
  const mutation = useSetManagerPermissionMutation();
  const [selected, setSelected] = useState('');

  useEffect(() => {
    setSelected(managerPermission ?? '');
  }, [managerPermission]);

  useEffect(() => {
    if (mutation.isSuccess) {
      const t = setTimeout(() => mutation.reset(), 2500);
      return () => clearTimeout(t);
    }
  }, [mutation.isSuccess]);

  const handleChangePermission = (selected: string) => {
    mutation.mutate({ guildId, permission: selected });
  };

  return (
    <Select
      onChange={handleChangePermission}
      value={selected}
      label="Manager Permission"
      hideErrorMessage
      hideOptionalFlag
      disabled={disabled || mutation.isPending}
      hint="The permission level for the manager."
      options={MANAGER_PERMISSION_OPTIONS}
    >
      <Select.Selected>
        {(item) => <span>{item.label}</span>}
      </Select.Selected>
      <Select.Area>
        <Select.Option>
          {(item) => <span>{item.label}</span>}
        </Select.Option>
      </Select.Area>
    </Select>
  );
};

export default ManagerPermissionSelect;
