import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";
import { API_ENDPOINTS, getFullUrl } from "../../api/endpoints/config";

// ── Initial state ─────────────────────────────────────────────────────────────

const initialState = {
  user: null,
  roleName: null,
  isLoggedIn: false,
  accessToken: null,
  refreshToken: null,
  expiresIn: null,
  status: "idle",
  error: null,
};

// ── Thunk ─────────────────────────────────────────────────────────────────────

export const loginUser = createAsyncThunk(
  "login/loginUser",
  async ({ username, password }, { rejectWithValue }) => {
    // ✅ removed dispatch — no cross-slice side-dispatching
    try {
      const { data: payload } = await axiosClient.post(
        getFullUrl(API_ENDPOINTS.AUTH.LOGIN),
        { username, password },
      );

      const authData = payload?.data;
      const user = authData?.user ?? null;
      const accessToken = authData?.accessToken ?? null;
      const refreshToken = authData?.refreshToken ?? null;
      const expiresIn = authData?.expiresIn ?? null; // raw seconds from backend e.g. 21599

      if (accessToken) {
        localStorage.setItem(
          "loginSession",
          JSON.stringify({
            user,
            accessToken,
            refreshToken,
            expiresIn, // raw seconds — useful for TTL display or recalculation
            roleName: user?.roleName ?? null,
          }),
        );
      }

      return { user, accessToken, refreshToken, expiresIn};
    } catch (error) {
      const message =
        error.response?.data?.errorDetails?.errorMessage ?? error.message; // ✅ full optional chain — won't throw if `errorDetails` is undefined
      return rejectWithValue(message);
    }
  },
);

// ── Slice ─────────────────────────────────────────────────────────────────────

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout() {
      // ✅ return initialState instead of manually nulling every field
      localStorage.removeItem("loginSession");
      return { ...initialState, status: "unauthenticated" };
    },
    restoreFromLocalStorage(state, action) {
      const {
        user,
        roleName,
        accessToken,
        refreshToken,
        expiresIn,
      } = action.payload;
      state.user = user ?? null;
      state.roleName = roleName ?? null;
      state.isLoggedIn = Boolean(user);
      state.accessToken = accessToken ?? null;
      state.refreshToken = refreshToken ?? null;
      state.expiresIn = expiresIn ?? null;
      state.status = "authenticated";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { user, accessToken, refreshToken, expiresIn } = action.payload;
        state.user = user ?? null;
        state.roleName = user?.roleName ?? null;
        state.isLoggedIn = Boolean(user);
        state.accessToken = accessToken ?? null;
        state.refreshToken = refreshToken ?? null;
        state.expiresIn = expiresIn ?? null;
        state.status = "authenticated";
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log(action.payload);
        return {
          // ✅ reset to initialState shape on failure, then override error/status
          ...initialState,
          status: "failed",
          error: action.payload ?? null,
          
        };
      });
  },
});

// ── Exports ───────────────────────────────────────────────────────────────────

export const { logout, restoreFromLocalStorage } = loginSlice.actions;
export const selectRoleName = (state) => state.login.roleName;
export const selectIsLoggedIn = (state) => state.login.isLoggedIn;
export const selectAccessToken = (state) => state.login.accessToken;
export default loginSlice.reducer;
