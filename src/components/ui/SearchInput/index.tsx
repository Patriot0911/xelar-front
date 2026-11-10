'use client';

import { useRef } from 'react';
import { LuSearch, LuX } from 'react-icons/lu';
import Loading from '@/components/ui/Loading';
import { cn } from '@/lib/utils';
import { ISearchInputProps } from './SearchInput';

import styles from './styles.module.scss';

/** Compact search field for list toolbars: leading icon, clear button, Escape clears. */
const SearchInput = ({
  value,
  onChange,
  label,
  isSearching,
  placeholder = 'Search',
  className,
  ...props
}: ISearchInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const clear = () => {
    onChange('');
    inputRef.current?.focus();
  };

  return (
    <div className={cn(styles.root, className)}>
      <span className={styles.leading} aria-hidden>
        {isSearching ? <Loading type="spinner" size="sm" /> : <LuSearch size={14} />}
      </span>
      <input
        {...props}
        ref={inputRef}
        type="search"
        className={styles.input}
        value={value}
        placeholder={placeholder}
        aria-label={label ?? placeholder}
        autoComplete="off"
        spellCheck={false}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Escape' && value) {
            event.preventDefault();
            onChange('');
          }
          props.onKeyDown?.(event);
        }}
      />
      {value && (
        <button type="button" className={styles.clear} onClick={clear} aria-label="Clear search">
          <LuX size={13} />
        </button>
      )}
    </div>
  );
};

export default SearchInput;
