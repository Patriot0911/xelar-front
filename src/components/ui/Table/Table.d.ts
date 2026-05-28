import { ReactNode } from 'react';

export interface ITableColumn<T> {
  key: string;
  title: ReactNode;
  dataBind?: keyof T;
  render?: (row: T, index: number) => ReactNode;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
  className?: string;
};

export interface ITablePaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onChange: (page: number) => void;
};

export interface ITableProps<T> {
  columns: ITableColumn<T>[];
  data: T[];
  rowKey: keyof T | ((row: T) => string);
  isLoading?: boolean;
  skeletonRows?: number;
  emptyText?: ReactNode;
  emptyComponent?: ReactNode;
  loadingComponent?: ReactNode;
  onRowClick?: (row: T) => void;
  className?: string;
  children: ReactNode;
};

export interface ITableBodyProps {
  className?: string;
};

export interface ITableHeaderProps {
  className?: string;
};
