'use client';

import { Permission, PERMISSION_LABELS } from '@/lib/constants/permissions';  
import { LuCheck } from 'react-icons/lu';
import { IPermissionToggleProps } from './PermissionToggle';

import styles from './styles.module.scss';

const PermissionToggle = ({ permission, checked, onChange, }: IPermissionToggleProps) => {
  return (
    <button
      type="button"
      className={`${styles.permToggle} ${checked ? styles.permToggleActive : ''}`}
      onClick={() => onChange(permission, !checked)}
      aria-pressed={checked}
    >
      <span className={`${styles.permCheckbox} ${checked ? styles.permCheckboxChecked : ''}`}>
        {checked && <LuCheck size={10} strokeWidth={3} />}
      </span>
      <span className={styles.permLabel}>{PERMISSION_LABELS[permission as Permission]}</span>
      <span className={styles.permKey}>{permission}</span>
    </button>
  );
}

export default PermissionToggle;
