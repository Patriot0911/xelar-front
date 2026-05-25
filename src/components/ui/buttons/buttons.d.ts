import { ButtonHTMLAttributes } from 'react';

export interface IBaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
};

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'danger'
  | 'success';

export type ButtonSize =
  | 'sm'
  | 'md'
  | 'lg';

export interface IButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

export interface IExternalButtonProps {
  label: string;
  href: string;
};
