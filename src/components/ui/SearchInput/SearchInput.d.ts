import { InputHTMLAttributes } from 'react';

export interface ISearchInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'type'> {
  value: string;
  onChange: (value: string) => void;
  /** Accessible name; defaults to the placeholder. */
  label?: string;
  /** Shows a spinner instead of the search icon (e.g. while the debounced request runs). */
  isSearching?: boolean;
  className?: string;
};
