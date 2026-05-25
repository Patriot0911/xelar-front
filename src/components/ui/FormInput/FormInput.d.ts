import { InputHTMLAttributes, ReactNode } from 'react';
import { FieldValues, Path } from 'react-hook-form';

export interface IFormInputProps<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: Path<T>;
  onIconClick?: () => void;
  icon?: ReactNode;
  hint?: string;
  hideErrorMessage?: boolean;
};
