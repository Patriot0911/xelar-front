import { apiClient } from './client';

export interface AuthResponse {
  tokens: { accessToken: string; refreshToken: string };
  user: { id: string; displayName: string; discordId?: string | null };
}

export interface UserPayload {
  id: string;
  displayName: string;
  discordId?: string | null;
}

export const authApi = {
  discordCallback: (code: string): Promise<AuthResponse> =>
    apiClient.get(`/api/auth/discord/authorize?code=${code}`).then((r) => r.data),

  me: (): Promise<UserPayload> =>
    apiClient.get('/api/auth/me').then((r) => r.data),

  logout: (): Promise<void> =>
    apiClient.post('/api/auth/logout').then((r) => r.data),
};
