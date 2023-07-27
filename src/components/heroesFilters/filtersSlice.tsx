import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FiltersState = {
  activeFilter: string;
};

const initialState: FiltersState = {
  activeFilter: "all",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    chooseActiveFilter: (state, action: PayloadAction<string>) => {
      state.activeFilter = action.payload;
    },
  },
});

const { actions, reducer } = filtersSlice;

export default reducer;
export const { chooseActiveFilter } = actions;
