'use client';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { LuCheck, LuColumns3, LuRotateCcw } from 'react-icons/lu';
import { cn } from '@/lib/utils';
import { ITableColumnsMenuProps } from './TableColumnsMenu';

import styles from './styles.module.scss';

/** "Columns" picker in a table header: show / hide columns; the menu stays open while toggling. */
const TableColumnsMenu = <T,>({ columns, visibility }: ITableColumnsMenuProps<T>) => {
  const options = columns.filter((col) => col.hideable !== false);
  if (!options.length) return null;

  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          className={cn(styles.trigger, visibility.isCustomized && styles.customized)}
          aria-label="Choose columns"
          title="Choose columns"
        >
          <LuColumns3 size={14} aria-hidden />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className={styles.content} align="end" sideOffset={8} collisionPadding={12}>
          <DropdownMenu.Label className={styles.heading}>Columns</DropdownMenu.Label>

          {options.map((col) => (
            <DropdownMenu.CheckboxItem
              key={col.key}
              className={styles.item}
              checked={visibility.isVisible(col.key)}
              disabled={!visibility.canToggle(col.key)}
              onCheckedChange={() => visibility.toggle(col.key)}
              onSelect={(e) => e.preventDefault()}
            >
              <span className={styles.box} aria-hidden>
                <DropdownMenu.ItemIndicator>
                  <LuCheck size={11} strokeWidth={3} />
                </DropdownMenu.ItemIndicator>
              </span>
              {col.pickerLabel ?? col.title}
            </DropdownMenu.CheckboxItem>
          ))}

          <DropdownMenu.Separator className={styles.separator} />
          <DropdownMenu.Item
            className={cn(styles.item, styles.reset)}
            disabled={!visibility.isCustomized}
            onSelect={(e) => {
              e.preventDefault();
              visibility.reset();
            }}
          >
            <LuRotateCcw size={13} aria-hidden />
            Reset to default
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default TableColumnsMenu;
