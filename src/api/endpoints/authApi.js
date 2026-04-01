import axiosClient from '../axiosClient';
import { setAuthData, setError, setLoading } from '../../redux/Slices/authSlice';
import { loginPending, loginSuccess, loginFailed } from '../../redux/Slices/loginSlice';
import { store } from '../../redux/store';
import { API_ENDPOINTS, getFullUrl } from './config';
import axios from 'axios';

export const loginUser = async (credentials) => {
  store.dispatch(setLoading());
  store.dispatch(loginPending());
  try {
    const response = await axiosClient.post(getFullUrl(API_ENDPOINTS.AUTH.LOGIN), credentials);
    const { token, refreshToken, expiresAt, user } = response.data;

    store.dispatch(setAuthData({ token, refreshToken, expiresAt }));
    if (user) store.dispatch(loginSuccess(user));

    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    store.dispatch(setError(message));
    store.dispatch(loginFailed(message));
    throw error;
  }
};

export const loadAuthToken = async () => {
  store.dispatch(setLoading());
  store.dispatch(loginPending());
  try {
    // Use plain axios without interceptors for initial token load (full URL)
    const response = await axios.get(`${API_ENDPOINTS.BASE.BASE_URL}${getFullUrl(API_ENDPOINTS.AUTH.TOKEN)}`);
    const { accessToken, refreshToken, expiresIn, tokenType } = response.data;

    console.log('📝 Auth response received:', {
      hasToken: !!accessToken,
      hasRefreshToken: !!refreshToken,
      expiresIn: expiresIn,
      tokenType: tokenType,
    });

    if (accessToken) {
      // Calculate expiresAt from expiresIn (current time + expiresIn seconds)
      const expiresAt = Date.now() + (expiresIn * 1000);

      store.dispatch(setAuthData({
        token: accessToken,
        refreshToken,
        expiresAt: expiresAt
      }));

      console.log('💾 Auth data dispatched to Redux store');
      console.log('🔑 Token preview:', accessToken?.substring(0, 30) + '...');
      console.log('⏰ Token expires at:', new Date(expiresAt).toLocaleString());
    } else {
      console.warn('⚠️ No access token received from auth endpoint');
    }

    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    console.error('💥 Error loading auth token:', message);

    // Don't throw error - allow app to continue without auth
    // This prevents the app from crashing if the backend endpoint is not ready
    console.warn('🔄 Continuing without authentication - backend endpoint may not be implemented yet');

    // Clear loading states
    store.dispatch(setError(null)); // Clear any previous errors
    return null;
  }
};

export const fetchCurrentUser = async () => {
  try {
    const response = await axiosClient.get(getFullUrl(API_ENDPOINTS.AUTH.ME));
    store.dispatch(loginSuccess(response.data));
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    store.dispatch(setError(message));
    store.dispatch(loginFailed(message));
    throw error;
  }
};
