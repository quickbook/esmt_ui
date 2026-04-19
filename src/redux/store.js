import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/authSlice';
import loginReducer from './Slices/loginSlice';
import domainReducer from './Slices/domainSlice';
import pondEstimateReducer from './Slices/pondEstimateSlice';
import signUpReducer from './Slices/signUpSlice';
import adminReducer from './Slices/adminSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    login: loginReducer,
    signUp: signUpReducer,
    domain: domainReducer,
    pondEstimate: pondEstimateReducer,
    admin: adminReducer,
  },
});
