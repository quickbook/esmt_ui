import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isLoggedIn: false,
  status: 'idle',
  error: null,
};

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
      state.isLoggedIn = true;
      state.status = 'authenticated';
      state.error = null;
    },
    loginFailed(state, action) {
      state.error = action.payload;
      state.status = 'failed';
      state.isLoggedIn = false;
    },
    logout(state) {
      state.user = null;
      state.isLoggedIn = false;
      state.status = 'unauthenticated';
      state.error = null;
    },
  },
});

export const { loginPending, loginSuccess, loginFailed, logout } = loginSlice.actions;
export default loginSlice.reducer;
