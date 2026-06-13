'use client';

import { cn } from '@/lib/utils';
import { useSelectContext } from '../../context';

import styles from './styles.module.scss';
import { ISelectSearchProps } from './SelectSearch';

const SelectSearch = ({ className, placeholder = 'Search...' }: ISelectSearchProps) => {
  const { isOpen, searchable, search, setSearch } = useSelectContext();

  if (!isOpen || !searchable) return null;

  return (
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      onClick={(e) => e.stopPropagation()}
      placeholder={placeholder}
      className={cn(styles.search, className)}
      autoFocus
    />
  );
};

export default SelectSearch;
