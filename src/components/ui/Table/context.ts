import { createContext, ReactNode, useContext } from 'react';
import { ITableColumn } from './Table';

interface ITableContext<T = unknown> {
  columns: ITableColumn<T>[];
  data: T[];
  isLoading: boolean;
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
