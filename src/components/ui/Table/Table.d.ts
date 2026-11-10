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

export interface ITableAction<T> {
  key: string;
  icon: ReactNode;
  label: string;
  variant?: 'danger' | 'primary';
  disabled?: boolean | ((row: T) => boolean);
  onClick: (row: T) => void;
};

export interface ITablePaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onChange: (page: number) => void;
};

export interface ITableProps<T> {
  columns: ITableColumn<T>[];
  actions?: ITableAction<T>[];
  data: T[];
  rowKey: keyof T | ((row: T) => string);
  isLoading?: boolean;
  /** Rows per page of a paginated table — pass the same value as `TablePagination`'s `pageSize`.
   *  It's the default for both `skeletonRows` and `minRows`, so the table always holds one full page of height. */
  pageSize?: number;
  /** Skeleton rows while loading. Defaults to `pageSize`, otherwise 5. */
  skeletonRows?: number;
  /** Rows of height the body always reserves (filler rows / taller empty & loading states), so the
   *  table doesn't change height between pages, loading and empty. Defaults to `pageSize`, otherwise `skeletonRows`. */
  minRows?: number;
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
