export interface IPermissionToggleProps {
  permission: Permission;
  checked: boolean;
  onChange: (p: Permission, checked: boolean) => void;
};
