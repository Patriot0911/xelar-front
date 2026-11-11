
import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import styles from './styles.module.scss';

import { ITableProps } from './Table';
import { TableContext } from './context';
import { TableHeader } from './TableHeader';
import { TableBody } from './TableBody';

const Table = <T,>({
  columns,
  actions,
  data,
  rowKey,
  isLoading = false,
  pageSize,
  skeletonRows = pageSize ?? 5,
  minRows = pageSize ?? skeletonRows,
  emptyText,
  emptyComponent,
  loadingComponent,
  onRowClick,
  columnsVisibility,
  className,
  children,
}: ITableProps<T>) => {
  const visibleColumns = useMemo(
    () => (columnsVisibility ? columns.filter((col) => columnsVisibility.isVisible(col.key)) : columns),
    [columns, columnsVisibility],
  );

  // Row actions and the column picker share one trailing cell.
  const trailingWidth = actions?.length
    ? Math.max(actions.length * 32 + 8, columnsVisibility ? 52 : 0)
    : (columnsVisibility ? 52 : 0);

  return (
    <TableContext.Provider
      value={{
        columns: visibleColumns,
        allColumns: columns,
        columnsVisibility,
        trailingWidth,
        actions,
        data,
        rowKey,
        isLoading,
        skeletonRows,
        minRows,
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
