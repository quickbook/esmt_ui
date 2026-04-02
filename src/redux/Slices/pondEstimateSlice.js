import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
  quoteId: null,
  loading: false,
  error: null,
};

const pondEstimateSlice = createSlice({
  name: 'pondEstimate',
  initialState,
  reducers: {
    // Post estimate
    postEstimateStart(state) {
      state.loading = true;
      state.error = null;
    },
    postEstimateSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
      state.quoteId = action.payload?.id || action.payload?.quoteId;
      state.error = null;
    },
    postEstimateFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.data = null;
    },

    // Clear pond estimate data (after confirmation)
    clearPondEstimateData(state) {
      state.data = null;
      state.quoteId = null;
      state.loading = false;
      state.error = null;
    },

    // Reset error
    clearError(state) {
      state.error = null;
    },
  },
});

export const {
  postEstimateStart,
  postEstimateSuccess,
  postEstimateFailure,
  clearPondEstimateData,
  clearError,
} = pondEstimateSlice.actions;

export default pondEstimateSlice.reducer;
