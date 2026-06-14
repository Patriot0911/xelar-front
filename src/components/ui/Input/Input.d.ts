import { InputHTMLAttributes, ReactNode } from 'react';

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  hideOptionalFlag?: boolean;
  icon?: ReactNode;
  onIconClick?: () => void;
  hideErrorMessage?: boolean;
  touched?: boolean;
};
