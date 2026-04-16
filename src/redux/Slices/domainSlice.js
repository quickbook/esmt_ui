import { createSlice } from '@reduxjs/toolkit';
import axiosClient from '../../api/axiosClient';
import { API_ENDPOINTS, getFullUrl } from '../../api/endpoints/config';

const initialState = {
  leadSources: [],
  pondAccess: [],
  fishSpecies: [],
  pondOptions: { NEW: [], OLD: [] },
  countries:[],
  loading: {
    leadSources: false,
    pondAccess: false,
    fishSpecies: false,
    pondOptions: false,
    countries: false,
  },
  error: {
    leadSources: null,
    pondAccess: null,
    fishSpecies: null,
    pondOptions: null,
    countries: null,
  },
};

const domainSlice = createSlice({
  name: 'domain',
  initialState,
  reducers: {
    // Lead Sources
    fetchLeadSourcesStart(state) {
      state.loading.leadSources = true;
      state.error.leadSources = null;
    },
    fetchLeadSourcesSuccess(state, action) {
      state.loading.leadSources = false;
      state.leadSources = action.payload;
      state.error.leadSources = null;
    },
    fetchLeadSourcesFailure(state, action) {
      state.loading.leadSources = false;
      state.error.leadSources = action.payload;
    },

    // Pond Access
    fetchPondAccessStart(state) {
      state.loading.pondAccess = true;
      state.error.pondAccess = null;
    },
    fetchPondAccessSuccess(state, action) {
      state.loading.pondAccess = false;
      state.pondAccess = action.payload;
      state.error.pondAccess = null;
    },
    fetchPondAccessFailure(state, action) {
      state.loading.pondAccess = false;
      state.error.pondAccess = action.payload;
    },

    // Fish Species
    fetchFishSpeciesStart(state) {
      state.loading.fishSpecies = true;
      state.error.fishSpecies = null;
    },
    fetchFishSpeciesSuccess(state, action) {
      state.loading.fishSpecies = false;
      state.fishSpecies = action.payload;
      state.error.fishSpecies = null;
    },
    fetchFishSpeciesFailure(state, action) {
      state.loading.fishSpecies = false;
      state.error.fishSpecies = action.payload;
    },

    // Pond Options
    fetchPondOptionsStart(state) {
      state.loading.pondOptions = true;
      state.error.pondOptions = null;
    },
    fetchPondOptionsSuccess(state, action) {
      state.loading.pondOptions = false;
      state.pondOptions = action.payload || { NEW: [], OLD: [] };
      state.error.pondOptions = null;
    },
    fetchPondOptionsFailure(state, action) {
      state.loading.pondOptions = false;
      state.error.pondOptions = action.payload;
    },

    // Countries
    fetchCountriesStart(state) {
      state.loading.countries = true;
      state.error.countries = null;
    },
    fetchCountriesSuccess(state, action) {
      state.loading.countries = false;
      state.countries = action.payload;
      state.error.countries = null;
    },
    fetchCountriesFailure(state, action) {
      state.loading.countries = false;
      state.error.countries = action.payload;
    },

    // Clear all domain data
    clearDomainData(state) {
      state.leadSources = [];
      state.pondAccess = [];
      state.fishSpecies = [];
      state.pondOptions = { NEW: [], OLD: [] };
      state.countries = [];
      state.error = {
        leadSources: null,
        pondAccess: null,
        fishSpecies: null,
        pondOptions: null,
        countries: null, 
      };
    },
  },
});

export const {
  fetchLeadSourcesStart,
  fetchLeadSourcesSuccess,
  fetchLeadSourcesFailure,
  fetchPondAccessStart,
  fetchPondAccessSuccess,
  fetchPondAccessFailure,
  fetchFishSpeciesStart,
  fetchFishSpeciesSuccess,
  fetchFishSpeciesFailure,
  fetchPondOptionsStart,
  fetchPondOptionsSuccess,
  fetchPondOptionsFailure,
  fetchCountriesStart,
  fetchCountriesSuccess,
  fetchCountriesFailure,
  clearDomainData,
} = domainSlice.actions;

// Thunk actions for fetching domain data
export const fetchLeadSources = () => async (dispatch) => {
  dispatch(fetchLeadSourcesStart());
  try {
    const response = await axiosClient.get(getFullUrl(API_ENDPOINTS.DOMAIN.LEAD_SOURCE));
    dispatch(fetchLeadSourcesSuccess(response.data));
    //console.log('📊 Lead sources loaded:', response.data);
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    dispatch(fetchLeadSourcesFailure(message));
    console.error('❌ Failed to load lead sources:', message);
  }
};

export const fetchPondAccess = () => async (dispatch) => {
  dispatch(fetchPondAccessStart());
  try {
    const response = await axiosClient.get(getFullUrl(API_ENDPOINTS.DOMAIN.POND_ACCESS));
    dispatch(fetchPondAccessSuccess(response.data));
    //console.log('🏞️ Pond access options loaded:', response.data);
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    dispatch(fetchPondAccessFailure(message));
    console.error('❌ Failed to load pond access options:', message);
  }
};

export const fetchFishSpecies = () => async (dispatch) => {
  dispatch(fetchFishSpeciesStart());
  try {
    const response = await axiosClient.get(getFullUrl(API_ENDPOINTS.DOMAIN.FISH_SPECIES));
    dispatch(fetchFishSpeciesSuccess(response.data));
    //console.log('🐟 Fish species loaded:', response.data);
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    dispatch(fetchFishSpeciesFailure(message));
    console.error('❌ Failed to load fish species:', message);
  }
};

export const fetchPondOptions = () => async (dispatch) => {
  dispatch(fetchPondOptionsStart());
  try {
    const response = await axiosClient.get(getFullUrl(API_ENDPOINTS.DOMAIN.POND_TYPES));
    dispatch(fetchPondOptionsSuccess(response.data));
    //console.log('🌾 Pond options loaded:', response.data);
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    dispatch(fetchPondOptionsFailure(message));
    console.error('❌ Failed to load pond options:', message);
  }
};

export const fetchCountries = () => async (dispatch) => {
  dispatch(fetchCountriesStart());
  try {
    const response = await axiosClient.get(getFullUrl(API_ENDPOINTS.DOMAIN.COUNTRIES));
    dispatch(fetchCountriesSuccess(response.data));
    //console.log('🌍 Countries loaded:', response.data);
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    dispatch(fetchCountriesFailure(message));
    console.error('❌ Failed to load countries:', message);
  }
};


// Fetch all domain data at once
export const fetchAllDomainData = () => async (dispatch) => {
  console.log('🔄 Fetching all domain data...');
  await Promise.all([
    dispatch(fetchLeadSources()),
    dispatch(fetchPondAccess()),
    dispatch(fetchFishSpecies()),
    dispatch(fetchPondOptions()),
    dispatch(fetchCountries()),
  ]);
  console.log('✅ All domain data loaded');
};

export default domainSlice.reducer;