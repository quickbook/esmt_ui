import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../api/axiosClient';
import { API_ENDPOINTS, getFullUrl } from '../../api/endpoints/config';

const initialState = {
  user: null,
  isRegistered: false,
  status: 'idle',
  error: null,
  loading: false,
};

export const signUpUser = createAsyncThunk(
  'signUp/signUpUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(getFullUrl(API_ENDPOINTS.AUTH.SIGNUP), userData);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    signUpPending(state) {
      state.status = 'loading';
      state.loading = true;
      state.error = null;
    },
    signUpSuccess(state, action) {
      state.isRegistered = true;
      state.status = 'succeeded';
      state.loading = false;
      state.error = null;
    },
    signUpFailed(state, action) {
      state.error = action.payload;
      state.status = 'failed';
      state.loading = false;
      state.isRegistered = false;
    },
    resetSignUp(state) {
      state.user = null;
      state.isRegistered = false;
      state.status = 'idle';
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.isRegistered = true;
        state.status = 'succeeded';
        state.loading = false;
        state.error = null;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
        state.loading = false;
        state.isRegistered = false;
      });
  },
});

export const { signUpPending, signUpSuccess, signUpFailed, resetSignUp } = signUpSlice.actions;
export default signUpSlice.reducer;
