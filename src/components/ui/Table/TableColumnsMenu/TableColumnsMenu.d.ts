import { ITableColumn, ITableColumnsVisibility } from '../Table';

export interface ITableColumnsMenuProps<T> {
  /** Every column of the table, hidden ones included. */
  columns: ITableColumn<T>[];
  visibility: ITableColumnsVisibility;
};
