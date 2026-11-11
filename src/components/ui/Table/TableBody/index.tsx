import TableActionCell from '../TableActionCell';
import { useTableContext } from '../context';
import { ITableBodyProps } from '../Table';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

import styles from './styles.module.scss';

export const TableBody = <T,>({ className }: ITableBodyProps) => {
  const {
    columns,
    actions,
    trailingWidth,
    data,
    rowKey,
    isLoading,
    skeletonRows,
    minRows,
    onRowClick,
    emptyText,
    emptyComponent,
    loadingComponent,
  } = useTableContext<T>();

  const colSpan = columns.length + (trailingWidth ? 1 : 0);
  // Single-cell states (empty / custom loading) stretch to the height of `minRows` rows.
  const stateStyle = minRows > 0 ? { height: `calc(var(--table-row-height) * ${minRows})` } : undefined;

  // Non-interactive rows that pad a short page up to `minRows`, so the table keeps its height.
  const renderFillerRows = (count: number) => Array.from({ length: Math.max(0, count) }, (_, i) => (
    <tr key={`filler-${i}`} className={styles.filler} aria-hidden>
      <td colSpan={colSpan} />
    </tr>
  ));

  const getRowKey = (row: T, index: number) =>
    typeof rowKey === 'function'
      ? rowKey(row)
      : String(row[rowKey] ?? index);

  const getCellValue = (row: T, col: typeof columns[number], index: number): ReactNode => {
    if (col.render) return col.render(row, index);
    if (col.dataBind) return row[col.dataBind] as ReactNode;
    return null;
  };

  if (isLoading) {
    if (loadingComponent) {
      return (
        <tbody className={cn(styles.tbody, className)}>
          <tr>
            <td colSpan={colSpan} className={styles.state} style={stateStyle}>
              {loadingComponent}
            </td>
          </tr>
        </tbody>
      );
    }

    return (
      <tbody className={cn(styles.tbody, className)}>
        {Array.from({ length: Math.max(skeletonRows, minRows) }).map((_, rowIndex) => (
          <tr key={rowIndex} className={styles['skeleton-row']}>
            {columns.map((col) => (
              <td
                key={col.key}
                style={{ width: col.width }}
                className={styles['table-cell']}
              >
                <div className={styles['skeleton-bar']} />
              </td>
            ))}
            {trailingWidth ? <td style={{ width: trailingWidth }} /> : null}
          </tr>
        ))}
      </tbody>
    );
  }

  if (data.length === 0) {
    return (
      <tbody className={cn(styles.tbody, className)}>
        <tr>
          <td colSpan={colSpan} className={styles.state} style={stateStyle}>
            {emptyComponent ?? emptyText ?? 'No data found'}
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody className={cn(styles.tbody, styles.body, className)}>
      {data.map((row, index) => (
        <tr
          key={getRowKey(row, index)}
          onClick={() => onRowClick?.(row)}
          className={cn(onRowClick && styles.clickable)}
        >
          {columns.map((col) => (
            <td
              key={col.key}
              style={{ width: col.width }}
              className={cn(
                styles['table-cell'],
                col.align && styles[`align-${col.align}`],
                col.className,
              )}
            >
              {getCellValue(row, col, index)}
            </td>
          ))}
          {actions?.length ? (
            <TableActionCell actions={actions} row={row} />
          ) : trailingWidth ? <td aria-hidden /> : null}
        </tr>
      ))}
      {renderFillerRows(minRows - data.length)}
    </tbody>
  );
};
