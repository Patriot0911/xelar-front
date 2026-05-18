import { AxiosResponse } from 'axios';

export interface IGenericResponseModel<T = unknown> {
  status: boolean;
  message?: string;
  data: T;
};

export interface IGenericAxiosResponse<T> extends AxiosResponse<IGenericResponseModel<T>> {};
