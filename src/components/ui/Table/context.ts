import { createContext, ReactNode, useContext } from 'react';
import { ITableAction, ITableColumn, ITableColumnsVisibility } from './Table';

interface ITableContext<T = unknown> {
  /** Visible columns only. */
  columns: ITableColumn<T>[];
  /** Every column, including hidden ones — for the column picker. */
  allColumns: ITableColumn<T>[];
  columnsVisibility?: ITableColumnsVisibility;
  /** Width of the trailing cell (row actions and / or the column picker); 0 when there is none. */
  trailingWidth: number;
  actions?: ITableAction<T>[];
  data: T[];
  isLoading: boolean;
  skeletonRows: number;
  minRows: number;
  rowKey: keyof T | ((row: T) => string);
  onRowClick?: (row: T) => void;
  emptyText?: ReactNode;
  emptyComponent?: ReactNode;
  loadingComponent?: ReactNode;
}

export const TableContext = createContext<ITableContext<any> | null>(null);

export const useTableContext = <T,>() => {
  const ctx = useContext(TableContext);
  if (!ctx) throw new Error('useTableContext must be used within Table');
  return ctx as ITableContext<T>;
};
