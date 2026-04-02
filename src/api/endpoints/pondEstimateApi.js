import axiosClient from '../axiosClient';
import { API_ENDPOINTS, getFullUrl } from './config';
import { store } from '../../redux/store';
import {
  postEstimateStart,
  postEstimateSuccess,
  postEstimateFailure,
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
  const { clearPondEstimateData } = require('../../redux/Slices/pondEstimateSlice');
  store.dispatch(clearPondEstimateData());
};
