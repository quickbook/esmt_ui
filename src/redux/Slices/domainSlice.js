import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";
import { API_ENDPOINTS, getFullUrl } from "../../api/endpoints/config";

// ── Helpers ───────────────────────────────────────────────────────────────────

const setPending  = (key) => (state)         => { state.loading[key] = true;  state.error[key] = null; };
const setRejected = (key) => (state, action) => { state.loading[key] = false; state.error[key] = action.payload; };

// ── Thunks ────────────────────────────────────────────────────────────────────

export const fetchLeadSources = createAsyncThunk(
  "domain/fetchLeadSources",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosClient.get(getFullUrl(API_ENDPOINTS.DOMAIN.LEAD_SOURCE));
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message ?? error.message);
    }
  }
);

export const fetchPondAccess = createAsyncThunk(
  "domain/fetchPondAccess",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosClient.get(getFullUrl(API_ENDPOINTS.DOMAIN.POND_ACCESS));
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message ?? error.message);
    }
  }
);

export const fetchFishSpecies = createAsyncThunk(
  "domain/fetchFishSpecies",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosClient.get(getFullUrl(API_ENDPOINTS.DOMAIN.FISH_SPECIES));
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message ?? error.message);
    }
  }
);

export const fetchPondOptions = createAsyncThunk(
  "domain/fetchPondOptions",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosClient.get(getFullUrl(API_ENDPOINTS.DOMAIN.POND_TYPES));
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message ?? error.message);
    }
  }
);

export const fetchCountries = createAsyncThunk(
  "domain/fetchCountries",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosClient.get(getFullUrl(API_ENDPOINTS.DOMAIN.COUNTRIES));
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message ?? error.message);
    }
  }
);

export const fetchFishSizes = createAsyncThunk(
  "domain/fetchFishSizes",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosClient.get(getFullUrl(API_ENDPOINTS.DOMAIN.FISH_SIZES));
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message ?? error.message);
    }
  }
);

export const fetchUnitTypes = createAsyncThunk(
  "domain/fetchUnitTypes",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosClient.get(getFullUrl(API_ENDPOINTS.DOMAIN.UNIT_TYPES));
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message ?? error.message);
    }
  }
);

// ── Fetch all ─────────────────────────────────────────────────────────────────

/** Dispatches all 7 domain fetches in parallel. */
export const fetchAllDomainData = () => (dispatch) =>
  Promise.all([
    dispatch(fetchLeadSources()),
    dispatch(fetchPondAccess()),
    dispatch(fetchFishSpecies()),
    dispatch(fetchPondOptions()),
    dispatch(fetchCountries()),
    dispatch(fetchFishSizes()),   // ✅ was missing from original fetchAllDomainData
    dispatch(fetchUnitTypes()),   // ✅ was missing from original fetchAllDomainData
  ]);

// ── Initial state ─────────────────────────────────────────────────────────────

const initialState = {
  leadSources: [],
  pondAccess:  [],
  fishSpecies: [],
  fishSizes:   [],
  unitTypes:   [],
  pondOptions: { NEW: [], OLD: [] },
  countries:   [],
  loading: {
    leadSources: false,
    pondAccess:  false,
    fishSpecies: false,
    pondOptions: false,
    countries:   false,
    fishSizes:   false,
    unitTypes:   false,
  },
  error: {
    leadSources: null,
    pondAccess:  null,
    fishSpecies: null,
    pondOptions: null,
    countries:   null,
    fishSizes:   null,
    unitTypes:   null,
  },
};

// ── Slice ─────────────────────────────────────────────────────────────────────

const domainSlice = createSlice({
  name: "domain",
  initialState,
  reducers: {
    clearDomainData: () => initialState, // ✅ return initialState directly instead of manually resetting every field
  },
  extraReducers: (builder) => {
    builder
      // ── Lead Sources ──────────────────────────────────────────────────────
      .addCase(fetchLeadSources.pending,   setPending("leadSources"))
      .addCase(fetchLeadSources.fulfilled, (state, action) => {
        state.loading.leadSources = false;
        state.leadSources         = action.payload;
        state.error.leadSources   = null;
      })
      .addCase(fetchLeadSources.rejected,  setRejected("leadSources"))

      // ── Pond Access ───────────────────────────────────────────────────────
      .addCase(fetchPondAccess.pending,   setPending("pondAccess"))
      .addCase(fetchPondAccess.fulfilled, (state, action) => {
        state.loading.pondAccess = false;
        state.pondAccess         = action.payload;
        state.error.pondAccess   = null;
      })
      .addCase(fetchPondAccess.rejected,  setRejected("pondAccess"))

      // ── Fish Species ──────────────────────────────────────────────────────
      .addCase(fetchFishSpecies.pending,   setPending("fishSpecies"))
      .addCase(fetchFishSpecies.fulfilled, (state, action) => {
        state.loading.fishSpecies = false;
        state.fishSpecies         = action.payload;
        state.error.fishSpecies   = null;
      })
      .addCase(fetchFishSpecies.rejected,  setRejected("fishSpecies"))

      // ── Pond Options ──────────────────────────────────────────────────────
      .addCase(fetchPondOptions.pending,   setPending("pondOptions"))
      .addCase(fetchPondOptions.fulfilled, (state, action) => {
        state.loading.pondOptions = false;
        state.pondOptions         = action.payload ?? { NEW: [], OLD: [] };
        state.error.pondOptions   = null;
      })
      .addCase(fetchPondOptions.rejected,  setRejected("pondOptions"))

      // ── Countries ─────────────────────────────────────────────────────────
      .addCase(fetchCountries.pending,   setPending("countries"))
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.loading.countries = false;
        state.countries         = action.payload;
        state.error.countries   = null;
      })
      .addCase(fetchCountries.rejected,  setRejected("countries"))

      // ── Fish Sizes ────────────────────────────────────────────────────────
      .addCase(fetchFishSizes.pending,   setPending("fishSizes"))
      .addCase(fetchFishSizes.fulfilled, (state, action) => {
        state.loading.fishSizes = false;
        state.fishSizes         = action.payload;
        state.error.fishSizes   = null;
      })
      .addCase(fetchFishSizes.rejected,  setRejected("fishSizes"))

      // ── Unit Types ────────────────────────────────────────────────────────
      .addCase(fetchUnitTypes.pending,   setPending("unitTypes"))
      .addCase(fetchUnitTypes.fulfilled, (state, action) => {
        state.loading.unitTypes = false;
        state.unitTypes         = action.payload;
        state.error.unitTypes   = null;
      })
      .addCase(fetchUnitTypes.rejected,  setRejected("unitTypes"));
  },
});

export const { clearDomainData } = domainSlice.actions;
export default domainSlice.reducer;