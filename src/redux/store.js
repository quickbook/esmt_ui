import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/authSlice';
import loginReducer from './Slices/loginSlice';
import domainReducer from './Slices/domainSlice';
import pondEstimateReducer from './Slices/pondEstimateSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    login: loginReducer,
    domain: domainReducer,
    pondEstimate: pondEstimateReducer,
  },
});
