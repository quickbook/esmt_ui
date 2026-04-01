import axios from "axios";
import { store } from "../redux/store";
import { updateToken, clearAuth } from "../redux/Slices/authSlice";
import { API_ENDPOINTS, getFullUrl } from "./endpoints/config";

// ✅ Base URL - just the domain, endpoints include full path
const axiosClient = axios.create({
  baseURL: "https://dev02-api.pranalyticx.cloud",
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue = [];

// ✅ Process queued requests after refresh
const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });
  failedQueue = [];
};

// ✅ Convert expiry safely
const getExpiryTime = (expiresAt, expiresIn) => {
  if (expiresAt) {
    return expiresAt > 9999999999 ? expiresAt : expiresAt * 1000;
  }
  if (expiresIn) {
    return Date.now() + expiresIn * 1000;
  }
  return null;
};

// ✅ Refresh Token API
const refreshAuthToken = async () => {
  const state = store.getState();
  const refreshToken = state.auth?.refreshToken;

  if (!refreshToken) {
    store.dispatch(clearAuth());
    throw new Error("No refresh token available");
  }

  try {
    const response = await axiosClient.post(
      getFullUrl(API_ENDPOINTS.AUTH.REFRESH),
      { refreshToken },
    );

    const data = response.data || {};

    const newToken = data.accessToken || data.token;

    if (!newToken) {
      throw new Error("No access token received");
    }

    const expiresAt = getExpiryTime(
      data.expiresAt,
      data.expires_in || data.expiresIn,
    );

    store.dispatch(
      updateToken({
        token: newToken,
        refreshToken: data.refreshToken || refreshToken,
        expiresAt,
      }),
    );

    return newToken;
  } catch (err) {
    store.dispatch(clearAuth());
    throw err;
  }
};

// ✅ Auth endpoints (skip attaching token)
const AUTH_PATHS = [API_ENDPOINTS.AUTH.TOKEN, API_ENDPOINTS.AUTH.REFRESH];

// ===============================
// 🔹 REQUEST INTERCEPTOR
// ===============================
axiosClient.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth?.token;

    const isAuthEndpoint = AUTH_PATHS.some((url) => config.url?.includes(url));

    if (token && !isAuthEndpoint) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// ===============================
// 🔹 RESPONSE INTERCEPTOR
// ===============================
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // ❌ If not 401 → reject
    if (error.response?.status !== 401 || originalRequest?._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      // ⏳ Queue requests while refreshing
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(axiosClient(originalRequest));
          },
          reject: (err) => reject(err),
        });
      });
    }

    isRefreshing = true;

    try {
      const newToken = await refreshAuthToken();

      processQueue(null, newToken);

      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return axiosClient(originalRequest);
    } catch (err) {
      processQueue(err, null);
      store.dispatch(clearAuth());
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  },
);

// ===============================
// 🔹 INITIAL AUTH LOAD
// ===============================
export const initializeAuth = async () => {
  try {
    console.log("🔐 Initializing auth token...");

    const response = await axiosClient.post(getFullUrl(API_ENDPOINTS.AUTH.TOKEN));

    const data = response.data || {};

    if (!data.accessToken) {
      throw new Error("No access token received");
    }

    const expiresAt = getExpiryTime(data.expiresAt, data.expiresIn);

    store.dispatch(
      updateToken({
        token: data.accessToken,
        refreshToken: data.refreshToken || null,
        expiresAt,
      }),
    );

    console.log("✅ Auth initialized");
    return data;
  } catch (error) {
    console.error("❌ Auth init failed:", error.message);
    return null;
  }
};

export default axiosClient;
