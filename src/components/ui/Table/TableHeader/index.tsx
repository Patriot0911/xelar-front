import { ITableHeaderProps } from '../Table';
import { useTableContext } from '../context';
import { cn } from '@/lib/utils';

import styles from './styles.module.scss';

export const TableHeader = <T,>({ className }: ITableHeaderProps) => {
  const { columns } = useTableContext<T>();

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
      </tr>
    </thead>
  );
};