import { PropsWithChildren } from 'react';
import { FieldValues, Path } from 'react-hook-form';
import { ISelectOption } from './context';

export interface IFormSelectProps<T extends FieldValues, O extends ISelectOption<string, string>> extends PropsWithChildren {
  name: Path<T>;
  options: O[];
  label?: string;
  hint?: string;
  hideErrorMessage?: boolean;
  placeholder?: string;
  className?: string;
  required?: boolean;
};
