import axiosClient from "../axiosClient";
import { API_ENDPOINTS, getFullUrl } from "./config";
import {
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
} from "../../redux/Slices/domainSlice";
import { store } from "../../redux/store";

// Domain data API functions (used independently or can be called from slice thunks)
export const getLeadSources = async () => {
  try {
    const response = await axiosClient.get(
      getFullUrl(API_ENDPOINTS.DOMAIN.LEAD_SOURCE),
    );
    console.log("📊 Lead sources fetched:", response.data);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    console.error("❌ Failed to fetch lead sources:", message);
    throw error;
  }
};

export const getPondAccess = async () => {
  try {
    const response = await axiosClient.get(
      getFullUrl(API_ENDPOINTS.DOMAIN.POND_ACCESS),
    );
    console.log("🏞️ Pond access options fetched:", response.data);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    console.error("❌ Failed to fetch pond access options:", message);
    throw error;
  }
};

export const getFishSpecies = async () => {
  try {
    const response = await axiosClient.get(
      getFullUrl(API_ENDPOINTS.DOMAIN.FISH_SPECIES),
    );
    console.log("🐟 Fish species fetched:", response.data);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    console.error("❌ Failed to fetch fish species:", message);
    throw error;
  }
};

export const getPondOptions = async () => {
  try {
    const response = await axiosClient.get(
      getFullUrl(API_ENDPOINTS.DOMAIN.POND_TYPES),
    );
    console.log("🌾 Pond options fetched:", response.data);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    console.error("❌ Failed to fetch pond options:", message);
    throw error;
  }
};

export const getCountryOptions = async () => {
  try {
    const response = await axiosClient.get(
      getFullUrl(API_ENDPOINTS.DOMAIN.COUNTRIES),
    );
    console.log("🌍 Country options fetched:", response.data);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    console.error("❌ Failed to fetch country options:", message);
    throw error;
  }
};

// Fetch all domain data with Redux dispatch
export const getAllDomainData = () => async (dispatch) => {
  console.log("🔄 Fetching all domain data from API...");
  try {
    // Start loading for all data types
    dispatch(fetchLeadSourcesStart());
    dispatch(fetchPondAccessStart());
    dispatch(fetchFishSpeciesStart());
    dispatch(fetchPondOptionsStart());
    dispatch(fetchCountriesStart());

    // Fetch all data in parallel

    const [leadSources, pondAccess, fishSpecies, pondOptions] =
      await Promise.all([
        getLeadSources(),
        getPondAccess(),
        getFishSpecies(),
        getPondOptions(),
        getCountryOptions(),
      ]);

    // Dispatch success actions
    dispatch(fetchLeadSourcesSuccess(leadSources));
    dispatch(fetchPondAccessSuccess(pondAccess));
    dispatch(fetchFishSpeciesSuccess(fishSpecies));
    dispatch(fetchPondOptionsSuccess(pondOptions));
    dispatch(fetchCountriesSuccess(countries));

    console.log("✅ All domain data fetched from API");
    return {
      leadSources,
      pondAccess,
      fishSpecies,
      pondOptions,
      countries,
    };
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    console.error("❌ Failed to fetch all domain data:", message);

    // Dispatch failure actions
    dispatch(fetchLeadSourcesFailure(message));
    dispatch(fetchPondAccessFailure(message));
    dispatch(fetchFishSpeciesFailure(message));
    dispatch(fetchPondOptionsFailure(message));
    dispatch(fetchCountriesFailure(message));

    throw error;
  }
};
