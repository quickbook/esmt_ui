/**
 * API Endpoints Configuration
 * Centralized endpoint paths to be combined with baseURL
 */

export const API_ENDPOINTS = {
  // Authentication endpoints
  BASE:{
    BASE_URL: "https://dev02-api.pranalyticx.cloud",
    API_BASE: "/esmt",
  },
  AUTH: {
    TOKEN: "/auth/token",
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
    REFRESH: '/auth/refresh',
    SIGNUP: '/auth/signup',
    VERIFY_EMAIL: '/auth/verify-email',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  DOMAIN: {
    LEAD_SOURCE: "/api/domain/lead-source",
    POND_ACCESS: "/api/domain/pond-access",
    FISH_SPECIES: "/api/domain/fish-types",
    POND_TYPES: "/api/domain/pond-purpose/by-pond-type",
  }, 
  POST:{
    POND_ESTIMATE: "/api/v1/quotes/estimate",
  },
  
};

export const getFullUrl = (endpoint) => `${API_ENDPOINTS.BASE.API_BASE}${endpoint}`;

export default API_ENDPOINTS;
