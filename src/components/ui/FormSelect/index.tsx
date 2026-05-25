import { FieldValues, useController, useFormContext } from 'react-hook-form';
import FormSelectOption from './components/FormSelectOption';
import { IFormSelectProps } from './FormSelect';
import { useRef, useState } from 'react';
import { ISelectOption, SelectContext } from './context';
import { cn } from '@/lib/utils';
import FormSelectedOption from './components/FormSelectedOption';
import FormSelectArea from './components/FormSelectArea';
import FormSelectTrigger from './components/FormSelectTrigger';

import styles from './styles.module.scss';
import useOnClickOutside from '@/hooks/shared/useOnClickOutside';

const FormSelect = <T extends FieldValues, O extends ISelectOption<string, string>>({
  name,
  label,
  hint,
  options,
  hideErrorMessage,
  placeholder = 'Select an option',
  className,
  children,
  required,
}: IFormSelectProps<T, O>) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const { control, formState: { isSubmitted } } = useFormContext<T>();
  const {
    field,
    fieldState: { error, isTouched, isDirty },
  } = useController({ name, control });

  const hasValue = Boolean(field.value);
  const selectedOption = options.find((o) => o.value === field.value);
  const showTouched = (isDirty || isTouched) && !error && hasValue;
  const showError = Boolean(error && (isSubmitted || isDirty || hasValue));

  useOnClickOutside(ref, () => setIsOpen(false));

  return (
    <SelectContext.Provider
      value={{
        options,
        value: field.value,
        selectedOption,
        onChange: (value) => {
          field.onChange(value);
          setIsOpen(false);
        },
        isOpen,
        toggle: () => setIsOpen((prev) => !prev),
        close: () => setIsOpen(false),
        showError,
        showTouched,
      }}
    >
      <div className={cn(styles.controller, className)} ref={ref}>
        <div className={styles['label-wrapper']}>
          {label && <label>{label}</label>}
          {!required && <span className={styles['flag-optional']}>Optional</span>}
        </div>

        <div
          className={cn(
            styles['controller-select'],
            hasValue && styles['controller-select__touched'],
            showError  && styles['controller-select__error'],
          )}
        >
          {children}
          {!hasValue && (
            <span className={styles.placeholder}>{placeholder}</span>
          )}
          <FormSelect.Trigger />
        </div>

        {hint && <span className={styles.hint}>{hint}</span>}

        {!hideErrorMessage && (
          <span className={styles['controller-error']}>
            {error?.message}
          </span>
        )}
      </div>
    </SelectContext.Provider>
  );
};

FormSelect.Option = FormSelectOption;
FormSelect.Selected = FormSelectedOption;
FormSelect.Area = FormSelectArea;
FormSelect.Trigger = FormSelectTrigger;

export default FormSelect;
