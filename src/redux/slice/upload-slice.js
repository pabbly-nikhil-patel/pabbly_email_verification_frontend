// src/redux/slices/fileUploadSlice.js
import { createSlice } from '@reduxjs/toolkit';

const fileUploadSlice = createSlice({
  name: 'fileUpload',
  initialState: {
    progress: 0, // Percentage of upload progress
    isUploading: false, // Boolean to indicate if upload is in progress
    isUploaded:false,
    isStartVerification:false,
    isVerificationCompleted:false
  },
  reducers: {
    startUpload(state) {
      state.isUploading = true;
      state.progress = 0;
    },
    updateProgress(state, action) {
      state.progress = action.payload; // Update the progress percentage
    },
    finishUpload(state) {
      state.isUploading = false;
      state.isUploaded=true;
      state.progress = 100; // Completion
    },

    startVerification(state){
      state.isStartVerification=true
      state.progress=0
    },

    isVerificationCompleted(state){
      state.isStartVerification=true;
      state.progress = 100;
    },


    resetUpload(state) {
      state.isUploading = false;
      state.progress = 0; // Reset to initial state
    },
  },
});

export const { startUpload, updateProgress, finishUpload, startVerification, resetUpload,isVerificationCompleted, } =
  fileUploadSlice.actions;

export default fileUploadSlice.reducer;
