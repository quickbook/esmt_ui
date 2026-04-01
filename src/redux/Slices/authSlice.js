import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  refreshToken: null,
  expiresAt: null,
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData(state, action) {
      const { token, refreshToken, expiresAt } = action.payload;
      state.token = token || state.token;
      state.refreshToken = refreshToken || state.refreshToken;
      state.expiresAt = expiresAt || state.expiresAt;
      state.status = 'authenticated';
      state.error = null;
    },
    updateToken(state, action) {
      const { token, expiresAt, refreshToken } = action.payload;
      state.token = token || state.token;
      state.expiresAt = expiresAt || state.expiresAt;
      if (refreshToken) state.refreshToken = refreshToken;
      state.status = 'authenticated';
      state.error = null;
    },
    clearAuth(state) {
      state.token = null;
      state.refreshToken = null;
      state.expiresAt = null;
      state.status = 'unauthenticated';
      state.error = null;
    },
    setError(state, action) {
      state.error = action.payload;
      state.status = 'failed';
    },
    setLoading(state) {
      state.status = 'loading';
      state.error = null;
    },
  },
});

export const { setAuthData, updateToken, clearAuth, setError, setLoading } = authSlice.actions;
export default authSlice.reducer;
