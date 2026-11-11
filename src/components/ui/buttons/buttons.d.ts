import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

export interface IBaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
};

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'danger'
  | 'success'
  /** Primary list/page action (create, add, load) — lilac neon, filled. */
  | 'neon'
  /** Action that leaves the app (invite bot, provider console) — indigo neon, outlined. */
  | 'neon-external';

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

export type LinkButtonVariant =
  | 'primary'
  | 'outline';

export interface ILinkButtonProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string;
  variant?: LinkButtonVariant;
  size?: ButtonSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};
