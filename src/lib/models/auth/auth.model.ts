export interface IAuthTokenModel {
  accessToken: string;
  refreshToken: string;
};

export interface IAuthStoreState {
  status: 'guest' | 'init' | 'authenticated';
};

