  import { createSlice } from '@reduxjs/toolkit';

  const fileUploadSlice = createSlice({
    name: 'fileUpload',
    initialState: {
      progress: 0,
      isUploading: false,
      isUploaded: false,
      isStartVerification: false,
      isVerificationCompleted: false,
    },
    reducers: {
      startUpload(state) {
        state.isUploading = true;
        state.progress = 0;
      },
      updateProgress(state, action) {
        state.progress = action.payload;
      },
      finishUpload(state) {
        state.isUploading = false;
        state.isUploaded = true;
        state.progress = 100;
      },
      startVerification(state) {
        state.isStartVerification = true;
        state.progress = 0;
      },
      completeVerification(state) {
        state.isStartVerification = false;
        state.isVerificationCompleted = true;
      },
      resetUpload(state) {
        state.isUploading = false;
        state.isUploaded = false;
        state.isStartVerification = false;
        state.isVerificationCompleted = false;
        state.progress = 0;
      },
      finishVerification(state) {
        state.isStartVerification = false;
        state.isVerificationCompleted = true;
        state.progress = 100; // Verification complete
      },
    },
  });

  export const {
    startUpload,
    updateProgress,
    finishUpload,
    startVerification,
    completeVerification,
    resetUpload,
    finishVerification
  } = fileUploadSlice.actions;

  export default fileUploadSlice.reducer;
