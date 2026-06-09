import { cn } from '@/lib/utils';
import { IInputProps } from './Input';

import styles from './styles.module.scss';

const Input = ({
  label,
  error,
  hint,
  icon,
  onIconClick,
  hideErrorMessage,
  touched,
  className,
  id,
  hideOptionalFlag,
  name,
  ...props
}: IInputProps) => {
  const inputId = id ?? name;
  const hasError = Boolean(error);

  return (
    <div className={styles.controller}>
      {
        (!label && !hideOptionalFlag) && (
          <div className={styles['label-wrapper']}>
            {label && (<label htmlFor={inputId}>{label}</label>)}
            {(!props.required && !hideOptionalFlag) && (
              <span className={styles['flag-optional']}>Optional</span>
            )}
          </div>
        )
      }
      <div
        className={cn(
          className,
          styles['controller-input'],
          touched && styles['controller-input__touched'],
          hasError && styles['controller-input__error'],
          props.disabled && styles['controller-input__disabled'],
        )}
      >
        <input
          {...props}
          id={inputId}
          name={name}
          aria-invalid={hasError}
          aria-describedby={inputId ? `${inputId}-error` : undefined}
        />
        {icon && (
          <button type="button" className={styles['icon-button']} onClick={onIconClick}>
            {icon}
          </button>
        )}
      </div>
      {hint && <span className={styles.hint}>{hint}</span>}
      {!hideErrorMessage && (
        <span className={styles['controller-error']} id={inputId ? `${inputId}-error` : undefined}>
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;
