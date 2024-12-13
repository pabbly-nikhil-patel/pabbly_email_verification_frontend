// src/redux/slices/fileUploadSlice.js
import { createSlice } from '@reduxjs/toolkit';

const fileUploadSlice = createSlice({
  name: 'fileUpload',
  initialState: {
    progress: 0, // Percentage of upload progress
    isUploading: false, // Boolean to indicate if upload is in progress
    isVerificationStarted: false,
    isCompleted: false, // Boolean to indicate completion
  },
  reducers: {
    startUpload(state) {
      state.isUploading = true;
      state.progress = 0;
      state.isCompleted = false;
      state.isVerificationStarted = false;
    },
    updateProgress(state, action) {
      state.progress = action.payload; // Update the progress percentage
    },
    finishUpload(state) {
      state.isUploading = false;
      state.progress = 100; // Completion
      state.isCompleted = true; // Mark upload as completed
    },
    startVerification(state) {
      state.isVerificationStarted = true; // Start verification process
    },
    resetUpload(state) {
      state.isUploading = false;
      state.progress = 0; // Reset to initial state
      state.isVerificationStarted = false;
      state.isCompleted = false;
    },
  },
});

export const { startUpload, updateProgress, finishUpload, startVerification, resetUpload } =
  fileUploadSlice.actions;

export default fileUploadSlice.reducer;
