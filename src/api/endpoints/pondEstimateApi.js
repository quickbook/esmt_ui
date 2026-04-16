import axiosClient from '../axiosClient';
import { API_ENDPOINTS, getFullUrl } from './config';
import { store } from '../../redux/store';
import {
  postEstimateStart,
  postEstimateSuccess,
  postEstimateFailure,
  clearPondEstimateData,
} from '../../redux/Slices/pondEstimateSlice';

/**
 * Post estimate data and create a quote
 * @param {Object} estimateData - The estimate data to submit
 * @returns {Promise} API response
 */
export const postEstimate = async (estimateData) => {
  store.dispatch(postEstimateStart());

  try {
    const response = await axiosClient.post(
      getFullUrl(API_ENDPOINTS.POST.POND_ESTIMATE),
      estimateData,
    );

    console.log('✅ Estimate posted successfully:', response.data);

    // Dispatch success with response data
    store.dispatch(postEstimateSuccess(response.data));

    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;

    console.error('❌ Estimate post failed:', errorMessage);

    // Dispatch failure
    store.dispatch(postEstimateFailure(errorMessage));

    throw error;
  }
};

/**
 * Reset pond estimate data in store
 * Called after quote confirmation
 */
export const resetQuote = () => {
  store.dispatch(clearPondEstimateData());
  console.log('🔄 Pond estimate data cleared');
};

/**
 * Get quote estimate (if there's a GET endpoint)
 * @param {String} quoteId - The ID of the quote to retrieve
 * @returns {Promise} API response with quote details
 */
export const getQuoteEstimate = async (quoteId) => {
  store.dispatch(postEstimateStart());
  try {
    // Assuming there might be a GET endpoint in the future
    // For now, using POST endpoint with query - adjust based on actual API
    const response = await axiosClient.get(
      getFullUrl(`${API_ENDPOINTS.POST.POND_ESTIMATE}/${quoteId}`),
    );

    console.log('✅ Quote estimate retrieved:', response.data);
    store.dispatch(postEstimateSuccess(response.data));

    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;

    console.error('❌ Failed to retrieve quote estimate:', errorMessage);
    store.dispatch(postEstimateFailure(errorMessage));

    throw error;
  }
};
