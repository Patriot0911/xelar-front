import { IAuthTokenModel } from './auth.model';
import { IUserPayloadModel } from './user.model';

export interface IAuthResponseModel {
  tokens: IAuthTokenModel;
  user: IUserPayloadModel;
};

export interface IAuthMeResponse extends IUserPayloadModel {};
