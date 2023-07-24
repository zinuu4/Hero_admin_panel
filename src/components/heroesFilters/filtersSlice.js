import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // filters: [],
  activeFilter: 'all'
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    chooseActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    }
  },
});

const { actions, reducer } = filtersSlice;

export default reducer;
export const {
  chooseActiveFilter
} = actions;