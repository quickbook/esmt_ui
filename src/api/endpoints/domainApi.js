import axiosClient from '../axiosClient';
import { API_ENDPOINTS, getFullUrl } from './config';

// Domain data API functions
export const getLeadSources = async () => {
  try {
    const response = await axiosClient.get(getFullUrl(API_ENDPOINTS.DOMAIN.LEAD_SOURCE));
    console.log('📊 Lead sources fetched:', response.data);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    console.error('❌ Failed to fetch lead sources:', message);
    throw error;
  }
};

export const getPondAccess = async () => {
  try {
    const response = await axiosClient.get(getFullUrl(API_ENDPOINTS.DOMAIN.POND_ACCESS));
    console.log('🏞️ Pond access options fetched:', response.data);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    console.error('❌ Failed to fetch pond access options:', message);
    throw error;
  }
};

export const getFishSpecies = async () => {
  try {
    const response = await axiosClient.get(getFullUrl(API_ENDPOINTS.DOMAIN.FISH_SPECIES));
    console.log('🐟 Fish species fetched:', response.data);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    console.error('❌ Failed to fetch fish species:', message);
    throw error;
  }
};

export const getPondOptions = async () => {
  try {
    const response = await axiosClient.get(getFullUrl(API_ENDPOINTS.DOMAIN.POND_TYPES));
    console.log('🌾 Pond options fetched:', response.data);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    console.error('❌ Failed to fetch pond options:', message);
    throw error;
  }
};

// Fetch all domain data
export const getAllDomainData = async () => {
  console.log('🔄 Fetching all domain data from API...');
  try {
    const [leadSources, pondAccess, fishSpecies, pondOptions] = await Promise.all([
      getLeadSources(),
      getPondAccess(),
      getFishSpecies(),
      getPondOptions(),
    ]);
    console.log('✅ All domain data fetched from API');
    return {
      leadSources,
      pondAccess,
      fishSpecies,
      pondOptions,
    };
  } catch (error) {
    console.error('❌ Failed to fetch all domain data:', error.message);
    throw error;
  }
};