import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosAdmin from "../../api/axiosAdmin";
import { API_ENDPOINTS, getFullUrl } from "../../api/endpoints/config";

const initialState = {
  masterList: [],
  status: "idle",
  error: null,
  loading: false,
};

// ── Thunks ──────────────────────────────────────────────────────────────────

export const getMasterList = createAsyncThunk(
  "admin/getMasterList",
  async (_, { rejectWithValue }) => {           // fix: `_` for unused arg, second param for helpers
    try {
      const response = await axiosAdmin.get(
        getFullUrl(API_ENDPOINTS.ADMIN.MASTER_LIST)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.errorDetails?.errorMessage ?? error.message);
    }
  }
);

export const createMasterListItem = createAsyncThunk(
  "admin/createMasterListItem",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosAdmin.post(
        getFullUrl(API_ENDPOINTS.ADMIN.MASTER_LIST),
        payload
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.errorDetails?.errorMessage ?? error.message);
    }
  }
);

export const updateMasterListItem = createAsyncThunk(
  "admin/updateMasterListItem",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosAdmin.put(
        getFullUrl(API_ENDPOINTS.ADMIN.MASTER_LIST),
        payload
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.errorDetails?.errorMessage ?? error.message);
    }
  }
);

export const deleteMasterListItem = createAsyncThunk(
  "admin/deleteMasterListItem",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosAdmin.delete(
        getFullUrl(API_ENDPOINTS.ADMIN.MASTER_LIST, payload)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.errorDetails?.errorMessage ?? error.message);
    }
  }
);

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Reusable pending/rejected state handlers */
const setPending  = (state)         => { state.status = "loading";  state.loading = true;  state.error = null; };
const setRejected = (state, action) => { state.status = "failed";   state.loading = false; state.error = action.payload; };

// ── Slice ────────────────────────────────────────────────────────────────────

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    resetStatus(state) {
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      // ── GET ──────────────────────────────────────────────────────────────
      .addCase(getMasterList.pending,   setPending)
      .addCase(getMasterList.fulfilled, (state, action) => {
        state.masterList = action.payload.data;
        state.status     = "succeeded";
        state.loading    = false;
        state.error      = null;
      })
      .addCase(getMasterList.rejected, setRejected)

      // ── POST ─────────────────────────────────────────────────────────────
      .addCase(createMasterListItem.pending,   setPending)
      .addCase(createMasterListItem.fulfilled, (state, action) => {
        state.masterList.push(action.payload);  // optimistically append
        state.status  = "succeeded";
        state.loading = false;
        state.error   = null;
      })
      .addCase(createMasterListItem.rejected, setRejected)

      // ── PUT ──────────────────────────────────────────────────────────────
      .addCase(updateMasterListItem.pending,   setPending)
      .addCase(updateMasterListItem.fulfilled, (state, action) => {
        const idx = state.masterList.findIndex((item) => item.id === action.payload.id);
        if (idx !== -1) state.masterList[idx] = action.payload;
        state.status  = "succeeded";
        state.loading = false;
        state.error   = null;
      })
      .addCase(updateMasterListItem.rejected, setRejected)

      // ── DELETE ───────────────────────────────────────────────────────────
      .addCase(deleteMasterListItem.pending,   setPending)
      .addCase(deleteMasterListItem.fulfilled, (state, action) => {
        state.masterList = state.masterList.filter((item) => item.id !== action.payload.id);
        state.status  = "succeeded";
        state.loading = false;
        state.error   = null;
      })
      .addCase(deleteMasterListItem.rejected, setRejected);
  },
});

export const { clearError, resetStatus } = adminSlice.actions;
export default adminSlice.reducer;