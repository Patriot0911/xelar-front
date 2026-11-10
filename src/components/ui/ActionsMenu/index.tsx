'use client';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { LuEllipsis } from 'react-icons/lu';
import { cn } from '@/lib/utils';
import { IActionsMenuProps } from './ActionsMenu';

import styles from './styles.module.scss';

/** "More actions" dropdown (Radix: keyboard navigation, focus management, portal). */
const ActionsMenu = ({ items, label = 'More actions', triggerText, align = 'end', className }: IActionsMenuProps) => (
  <DropdownMenu.Root modal={false}>
    <DropdownMenu.Trigger asChild>
      <button type="button" className={cn(styles.trigger, triggerText && styles.withText, className)} aria-label={label}>
        <LuEllipsis size={16} aria-hidden />
        {triggerText}
      </button>
    </DropdownMenu.Trigger>

    <DropdownMenu.Portal>
      <DropdownMenu.Content className={styles.content} align={align} sideOffset={8} collisionPadding={12}>
        {items.map(({ key, label: itemLabel, icon: Icon, description, variant = 'default', disabled, onSelect }) => (
          <DropdownMenu.Item
            key={key}
            className={cn(styles.item, styles[variant])}
            disabled={disabled}
            onSelect={onSelect}
          >
            {Icon && <Icon size={15} className={styles.icon} aria-hidden />}
            <span className={styles.text}>
              <span className={styles.label}>{itemLabel}</span>
              {description && <span className={styles.description}>{description}</span>}
            </span>
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  </DropdownMenu.Root>
);

export default ActionsMenu;
