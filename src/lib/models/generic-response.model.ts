import { AxiosResponse } from 'axios';

export interface IGenericResponseModel<T = unknown> {
  status: boolean;
  message?: string;
  data: T;
};

export interface IGenericErrorResponseModel<T = unknown> {
  status: false;
  message: string;
  data?: T;
};

export interface IGenericAxiosResponse<T> extends AxiosResponse<IGenericResponseModel<T>> {};

export interface IGenericListMeta {
  count: number;
};

export interface IGenericList<T, D = IGenericListMeta> {
  items: T[];
  meta: D;
};
