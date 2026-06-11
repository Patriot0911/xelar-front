import { PropsWithChildren } from 'react';
import { ISelectOption } from './context';

export interface ISelectProps<O extends ISelectOption<string, string>> extends PropsWithChildren {
  options: O[];
  value: string | undefined;
  onChange: (value: string) => void;
  label?: string;
  hideOptionalFlag?: boolean;
  hint?: string;
  error?: string;
  hideErrorMessage?: boolean;
  placeholder?: string;
  className?: string;
  required?: boolean;
  touched?: boolean;
  disabled?: boolean;
}
