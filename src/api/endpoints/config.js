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
  }

  // Pond related endpoints
  // POND: {
  //   GET_ALL: '/ponds',
  //   GET_BY_ID: (id) => `/ponds/${id}`,
  //   CREATE: '/ponds',
  //   UPDATE: (id) => `/ponds/${id}`,
  //   DELETE: (id) => `/ponds/${id}`,
  //   GET_SELECTION_OPTIONS: '/ponds/options',
  // },

  // // Fish estimator endpoints
  // ESTIMATOR: {
  //   GET_TROPHY_BASS: '/estimators/trophy-bass',
  //   GET_QUALITY_BASS_BREAM: '/estimators/quality-bass-bream',
  //   GET_VARIETY_SPECIES: '/estimators/variety-species',
  //   GET_CATFISH: '/estimators/catfish',
  //   GET_BIG_BREAM: '/estimators/big-bream',
  //   GET_ALA_CARTE: '/estimators/ala-carte',
  //   GET_ADULT_FISH: '/estimators/adult-fish',
  //   GET_FEED_BASS: '/estimators/feed-bass',
  //   GET_GRASS_CARP: '/estimators/grass-carp',
  // },

  // // Quote/Order endpoints
  // QUOTE: {
  //   GET_ALL: '/quotes',
  //   GET_BY_ID: (id) => `/quotes/${id}`,
  //   CREATE: '/quotes',
  //   UPDATE: (id) => `/quotes/${id}`,
  //   DELETE: (id) => `/quotes/${id}`,
  //   GET_ESTIMATE: '/quotes/estimate',
  // },

  // // Customer info endpoints
  // CUSTOMER: {
  //   GET_PROFILE: '/customers/profile',
  //   UPDATE_PROFILE: '/customers/profile',
  //   GET_ADDRESSES: '/customers/addresses',
  //   ADD_ADDRESS: '/customers/addresses',
  //   UPDATE_ADDRESS: (id) => `/customers/addresses/${id}`,
  //   DELETE_ADDRESS: (id) => `/customers/addresses/${id}`,
  // },

  // // Availability endpoints
  // AVAILABILITY: {
  //   CHECK: '/availability/check',
  //   GET_DELIVERY_DATES: '/availability/delivery-dates',
  // },
};

export const getFullUrl = (endpoint) => `${API_ENDPOINTS.BASE.API_BASE}${endpoint}`;

export default API_ENDPOINTS;
