// src/redux/slice/listNameSlice.js
import { createSlice } from '@reduxjs/toolkit';

const listNameSlice = createSlice({
  name: 'listName',
  initialState: {
    selectedListName: '',
  },
  reducers: {
    setSelectedListName: (state, action) => {
      state.selectedListName = action.payload;
    },
  },
});

export const { setSelectedListName } = listNameSlice.actions;
export default listNameSlice.reducer;