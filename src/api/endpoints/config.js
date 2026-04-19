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
    LOGIN: '/api/v1/users/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    SIGNUP: '/api/v1/users/register',
    //VERIFY_EMAIL: '/auth/verify-email',
    //FORGOT_PASSWORD: '/auth/forgot-password',
    //RESET_PASSWORD: '/auth/reset-password',
  },
  DOMAIN: {
    LEAD_SOURCE: "/api/domain/lead-source",
    POND_ACCESS: "/api/domain/pond-access",
    FISH_SPECIES: "/api/domain/fish-types",
    POND_TYPES: "/api/domain/pond-purpose/by-pond-type",
    COUNTRIES: "/api/domain/countries",
    FISH_SIZES: "/api/domain/fish-sizes",
    UNIT_TYPES: "/api/domain/unit-types",
  }, 
  POST:{
    POND_ESTIMATE: "/api/v1/quotes/estimate",
  },
  ADMIN:{
    MASTER_LIST: "/api/v1/fish-prices",
    ADD_ADMIN: "/api/v1/add-admin",
  }

};

export const getFullUrl = (endpoint) => `${API_ENDPOINTS.BASE.API_BASE}${endpoint}`;

export default API_ENDPOINTS;
