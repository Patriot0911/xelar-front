import { ITableHeaderProps } from '../Table';
import { useTableContext } from '../context';
import { cn } from '@/lib/utils';
import TableColumnsMenu from '../TableColumnsMenu';

import styles from './styles.module.scss';

export const TableHeader = <T,>({ className }: ITableHeaderProps) => {
  const { columns, allColumns, columnsVisibility, trailingWidth } = useTableContext<T>();

  return (
    <thead className={className}>
      <tr>
        {columns.map((col) => (
          <th
            key={col.key}
            style={{ width: col.width }}
            className={cn(
              styles['table-header-row'],
              col.align && styles[`align-${col.align}`],
            )}
          >
            {col.title}
          </th>
        ))}
        {trailingWidth ? (
          <th
            className={cn(styles['table-header-row'], styles.trailing)}
            style={{ width: trailingWidth }}
          >
            {columnsVisibility && <TableColumnsMenu columns={allColumns} visibility={columnsVisibility} />}
          </th>
        ) : null}
      </tr>
    </thead>
  );
};
