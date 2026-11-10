import { cn } from '@/lib/utils';
import { IListToolbarProps } from './ListToolbar';

import styles from './styles.module.scss';

/**
 * Bar above a list/table: filters and tabs on the left, search on the right. Fixed control height
 * (`--control-height-sm`) and spacing, so every list page has the same toolbar.
 */
const ListToolbar = ({ start, end, className }: IListToolbarProps) => (
  <div className={cn(styles.toolbar, className)}>
    {start && <div className={styles.start}>{start}</div>}
    {end && <div className={styles.end}>{end}</div>}
  </div>
);

export default ListToolbar;
