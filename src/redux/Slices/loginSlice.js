import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../api/axiosClient';
import { API_ENDPOINTS, getFullUrl } from '../../api/endpoints/config';
import { setError, setLoading } from './authSlice';

const initialState = {
  user: null,
  roleName: null,
  isLoggedIn: false,
  status: 'idle',
  error: null,
};

export const loginUser = createAsyncThunk(
  'login/loginUser',
  async ({ username, password }, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading());
      const response = await axiosClient.post(getFullUrl(API_ENDPOINTS.AUTH.LOGIN), {
        username,
        password,
      });

      const payload = response.data;
      const authData = payload?.data;
      const user = authData?.user || null;
      const accessToken = authData?.accessToken || null;
      const refreshToken = authData?.refreshToken || null;
      const expiresIn = authData?.expiresIn || null;

      if (accessToken) {
        const expiresAt = expiresIn ? Date.now() + expiresIn * 1000 : null;
        
        // Store login credentials and user data in localStorage
        const loginSessionData = {
          user,
          accessToken,
          refreshToken,
          expiresIn: expiresAt,
          roleName: user?.roleName || null,
        };
        localStorage.setItem('loginSession', JSON.stringify(loginSessionData));
      }

      return payload;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      dispatch(setError(message));
      return rejectWithValue(message);
    }
  }
);

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginPending(state) {
      state.status = 'loading';
      state.error = null;
    },
    loginSuccess(state, action) {
      state.user = action.payload;
      state.roleName = action.payload?.roleName || null;
      state.isLoggedIn = true;
      state.status = 'authenticated';
      state.error = null;
      console.log('✅ Login successful:', action.payload);
    },
    loginFailed(state, action) {
      state.error = action.payload;
      state.status = 'failed';
      state.isLoggedIn = false;
      state.user = null;
      state.roleName = null;
    },
    logout(state) {
      state.user = null;
      state.roleName = null;
      state.isLoggedIn = false;
      state.status = 'unauthenticated';
      state.error = null;
      localStorage.removeItem('loginSession');
    },
    restoreFromLocalStorage(state, action) {
      const { user, roleName } = action.payload;
      state.user = user;
      state.roleName = roleName;
      state.isLoggedIn = Boolean(user);
      state.status = 'authenticated';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const data = action.payload?.data || {};
        state.user = data.user || null;
        state.roleName = data.user?.roleName || null;
        state.isLoggedIn = Boolean(data.user);
        state.status = 'authenticated';
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload || action.error?.message;
        state.status = 'failed';
        state.isLoggedIn = false;
        state.user = null;
        state.roleName = null;
      });
  },
});

export const { loginPending, loginSuccess, loginFailed, logout, restoreFromLocalStorage } = loginSlice.actions;
export const selectRoleName = (state) => state.login.roleName;
export default loginSlice.reducer;
