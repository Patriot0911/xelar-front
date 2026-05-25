
import { cn } from '@/lib/utils';
import styles from './styles.module.scss';

import { ITableProps } from './Table';
import { TableContext } from './context';
import { TableHeader } from './TableHeader';
import { TableBody } from './TableBody';

const Table = <T,>({
  columns,
  data,
  rowKey,
  isLoading = false,
  emptyText,
  emptyComponent,
  loadingComponent,
  onRowClick,
  className,
  children,
}: ITableProps<T>) => {
  return (
    <TableContext.Provider
      value={{
        columns,
        data,
        rowKey,
        isLoading,
        emptyText,
        emptyComponent,
        loadingComponent,
        onRowClick,
      }}
    >
      <div className={cn(styles['table-wrapper'], className)}>
        <table className={styles.table}>
          {children}
        </table>
      </div>
    </TableContext.Provider>
  );
}

Table.Header = TableHeader;
Table.Body = TableBody;

export default Table;
