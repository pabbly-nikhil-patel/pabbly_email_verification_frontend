import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedListName: '',
};

const listNameSlice = createSlice({
  name: 'listName',
  initialState,
  reducers: {
    setSelectedListName(state, action) {
      state.selectedListName = action.payload;
    },
  },
});

export const { setSelectedListName } = listNameSlice.actions;
export default listNameSlice.reducer;
