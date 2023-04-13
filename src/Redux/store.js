import { configureStore } from '@reduxjs/toolkit';

import authReducer from './features/authSlice';
// import productReducer from '../Redux/features/Poll/pollSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // poll: productReducer,
  },
});
