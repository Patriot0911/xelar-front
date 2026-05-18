import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  displayName: string;
  discordId?: string | null;
}

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

interface AuthState {
  user: User | null;
  tokens: Tokens | null;
  isAuthenticated: boolean;
}

const STORAGE_KEY = 'xelar_auth';

function loadFromStorage(): Pick<AuthState, 'tokens' | 'user'> {
  if (typeof window === 'undefined') return { tokens: null, user: null };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { tokens: null, user: null };
    return JSON.parse(raw);
  } catch {
    return { tokens: null, user: null };
  }
}

const stored = loadFromStorage();

const initialState: AuthState = {
  user: stored.user ?? null,
  tokens: stored.tokens ?? null,
  isAuthenticated: !!stored.tokens?.accessToken,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<{ user: User; tokens: Tokens }>) {
      state.user = action.payload.user;
      state.tokens = action.payload.tokens;
      state.isAuthenticated = true;
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(action.payload));
      }
    },
    setTokens(state, action: PayloadAction<Tokens>) {
      state.tokens = action.payload;
      if (typeof window !== 'undefined' && state.user) {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ tokens: action.payload, user: state.user }),
        );
      }
    },
    clearAuth(state) {
      state.user = null;
      state.tokens = null;
      state.isAuthenticated = false;
      if (typeof window !== 'undefined') {
        localStorage.removeItem(STORAGE_KEY);
      }
    },
  },
});

export const { setAuth, setTokens, clearAuth } = authSlice.actions;
export default authSlice.reducer;
