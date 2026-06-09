import { cn } from '@/lib/utils';
import { useSelectContext } from '../../context';
import { LuChevronDown } from 'react-icons/lu';

import styles from './styles.module.scss';

interface ISelectTriggerProps {
  className?: string;
}

const SelectTrigger = ({ className }: ISelectTriggerProps) => {
  const { isOpen, toggle } = useSelectContext();

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(styles.trigger, className)}
      aria-expanded={isOpen}
      aria-haspopup="listbox"
    >
      <LuChevronDown
        size={16}
        className={cn(
          styles['trigger-icon'],
          isOpen && styles['trigger-icon__open'],
        )}
      />
    </button>
  );
};

export default SelectTrigger;
