import { createContext, useContext } from 'react';

export interface ISelectOption<T = string, K = string> {
  value: T;
  label: K;
};

export interface ISelectContext<O extends ISelectOption<T, K>, T = string, K = string> {
  options: O[];
  value: T | undefined;
  selectedOption: O | undefined;
  onChange: (value: T) => void;
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
  showError: boolean;
  showTouched: boolean;
};

export const SelectContext = createContext<ISelectContext<ISelectOption<any, any>> | null>(null);

export const useSelectContext = <O extends ISelectOption<string, string>>() => {
  const ctx = useContext(SelectContext);
  if (!ctx) {
    throw new Error('useSelectContext must be used within FormSelect');
  }
  return ctx as ISelectContext<O>;
};
