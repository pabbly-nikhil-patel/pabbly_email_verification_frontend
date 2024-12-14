// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';

import fileUploadReducer from './slice/upload-slice';

export const store = configureStore({
  reducer: {
    fileUpload: fileUploadReducer,
  },
});

export default store;
