import { ITableAction } from '../Table';

export interface TableActionCellProps<T> {
  actions: ITableAction<T>[];
  row: T;
};
