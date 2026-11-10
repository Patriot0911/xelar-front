import { cn } from '@/lib/utils';
import { ISectionTabsProps } from './SectionTabs';

import styles from './styles.module.scss';

/**
 * Page-level section tabs with a neon underline. Use for the main sections of a detail page;
 * use `Tabs` (segmented) for a secondary switch inside a section.
 */
const SectionTabs = <T extends string>({ items, value, onChange, label, className }: ISectionTabsProps<T>) => (
  <nav className={cn(styles.nav, className)} role="tablist" aria-label={label}>
    {items.map(({ key, label: itemLabel, icon: Icon }) => {
      const isActive = key === value;

      return (
        <button
          key={key}
          type="button"
          role="tab"
          aria-selected={isActive}
          data-active={isActive}
          className={styles.tab}
          onClick={() => onChange(key)}
        >
          {Icon && <Icon size={14} aria-hidden />}
          {itemLabel}
        </button>
      );
    })}
  </nav>
);

export default SectionTabs;
