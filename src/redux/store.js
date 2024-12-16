// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';

import listNameReducer from './slice/listNameSlice';
import fileUploadReducer from './slice/upload-slice';

export const store = configureStore({
  reducer: {
    fileUpload: fileUploadReducer,
    listName: listNameReducer,
  },
});

export default store;
