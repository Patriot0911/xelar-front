import { IconType } from 'react-icons';

export type ActionsMenuItemVariant = 'default' | 'danger';

export interface IActionsMenuItem {
  key: string;
  label: string;
  icon?: IconType;
  /** Secondary line under the label. */
  description?: string;
  variant?: ActionsMenuItemVariant;
  disabled?: boolean;
  onSelect: () => void;
};

export interface IActionsMenuProps {
  items: IActionsMenuItem[];
  /** Accessible name of the trigger. */
  label?: string;
  /** Text next to the trigger icon; omit for an icon-only trigger. */
  triggerText?: string;
  align?: 'start' | 'end';
  className?: string;
};
