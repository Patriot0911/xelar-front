import axios from 'axios';
import { apiClient, apiConfig } from '../api-client';
import { IAuthMeResponse, IAuthResponseModel, ILoginByEmailModel, IRegisterByEmailModel, ISessionModel, IUpdateProfilePayload } from '../models/auth';

export const REFRESH_TOKEN_KEY = 'refresh_token';
export const ACCESS_TOKEN_KEY = 'access_token';

export enum AuthQueryKey {
  Me = 'me',
  Sessions = 'sessions',
};

class AuthService {
  private static token: string | null = null;

  static setToken(token: string | null) {
    AuthService.token = token;
  }
  static updateTokens(accessToken: string, refreshToken?: string) {
    AuthService.setToken(accessToken);
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    if (refreshToken) {
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    }
  }
  static clearTokens() {
    AuthService.setToken(null);
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }

  static getToken(): string | null {
    return AuthService.token;
  }

  static async refreshToken(): Promise<IAuthResponseModel> {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }
    return axios.post('/api/auth/refresh', {}, {
      ...apiConfig,
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });
  }

  static discordCallback(code: string): Promise<IAuthResponseModel> {
    return apiClient.get(`/api/auth/discord/authorize?code=${code}`);
  }

  static loginByEmail(payload: ILoginByEmailModel): Promise<IAuthResponseModel> {
    return apiClient.post('/api/auth/login/email', payload);
  }

  static registerByEmail(payload: IRegisterByEmailModel): Promise<IAuthResponseModel> {
    return apiClient.post('/api/authregister/email', payload);
  }

  static getMeUser(): Promise<IAuthMeResponse> {
    return apiClient.get('/api/auth/me');
  }

  static logout(): Promise<void> {
    return apiClient.post('/api/auth/logout');
  }

  static updateProfile(payload: IUpdateProfilePayload): Promise<void> {
    return apiClient.patch('/api/auth/me', payload);
  }

  static getSessions(): Promise<ISessionModel[]> {
    return apiClient.get('/api/auth/sessions');
  }

  static revokeSession(sessionId: string): Promise<boolean> {
    return apiClient.delete(`/api/auth/sessions/${sessionId}`);
  }

  static unlinkDiscord(): Promise<void> {
    return apiClient.delete('/api/auth/discord/unlink');
  }

  static linkDiscord(code: string): Promise<void> {
    return apiClient.post('/api/auth/discord/link', { code });
  }
}

export default AuthService;
