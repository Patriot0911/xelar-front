'use client';

import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { ISelectOption, SelectContext } from './context';
import { ISelectProps } from './Select';
import useOnClickOutside from '@/hooks/shared/useOnClickOutside';
import SelectArea from './components/SelectArea';
import SelectOption from './components/SelectOption';
import SelectTrigger from './components/SelectTrigger';
import SelectedOption from './components/SelectedOption';

import styles from './styles.module.scss';

const Select = <O extends ISelectOption<string, string>>({
  value,
  onChange,
  options,
  label,
  hint,
  error,
  hideErrorMessage,
  placeholder = 'Select an option',
  className,
  required,
  touched,
  children,
  hideOptionalFlag,
}: ISelectProps<O>) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const hasValue = Boolean(value);
  const selectedOption = options.find((o) => o.value === value);
  const hasError = Boolean(error);

  useOnClickOutside(ref, () => setIsOpen(false));

  return (
    <SelectContext.Provider
      value={{
        options,
        value,
        selectedOption,
        onChange: (v) => {
          onChange(v);
          setIsOpen(false);
        },
        isOpen,
        toggle: () => setIsOpen((prev) => !prev),
        close: () => setIsOpen(false),
        showError: hasError,
        showTouched: Boolean(touched),
      }}
    >
      <div className={cn(styles.controller, className)} ref={ref}>
        {(label || (!required && !hideOptionalFlag)) && (
          <div className={styles['label-wrapper']}>
            {label && <label>{label}</label>}
            {!required && !hideOptionalFlag && <span className={styles['flag-optional']}>Optional</span>}
          </div>
        )}

        <div
          className={cn(
            styles['controller-select'],
            touched && !hasError && styles['controller-select__touched'],
            hasError && styles['controller-select__error'],
          )}
        >
          {children}
          {!hasValue && <span className={styles.placeholder}>{placeholder}</span>}
          <Select.Trigger />
        </div>

        {hint && <span className={styles.hint}>{hint}</span>}

        {!hideErrorMessage && (
          <span className={styles['controller-error']}>{error}</span>
        )}
      </div>
    </SelectContext.Provider>
  );
};

Select.Option = SelectOption;
Select.Selected = SelectedOption;
Select.Area = SelectArea;
Select.Trigger = SelectTrigger;

export default Select;
