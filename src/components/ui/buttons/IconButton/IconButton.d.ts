import { ButtonHTMLAttributes, ReactNode } from 'react';

export type IconButtonVariant = 'default' | 'accent' | 'danger';

export type IconButtonSize = 'sm' | 'md';

export interface IIconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  icon: ReactNode;
  label: string;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
};
