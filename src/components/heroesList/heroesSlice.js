import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import {useHttp} from '../../hooks/http.hook';

const heroesAdapter = createEntityAdapter();

// const initialState = {
//   heroes: [],
//   filteredHeroes: [],
//   heroesLoadingStatus: 'idle',
// }

const initialState = heroesAdapter.getInitialState({
  heroesLoadingStatus: 'idle',
  filteredHeroes: []
});

export const fetchHeroes = createAsyncThunk(
  'heroes/fetchHeroes',
  () => {
    const {request} = useHttp();
    return request("http://localhost:3001/heroes");
  }
);

const heroesSlice = createSlice({
  name: 'heroes',
  initialState,
  reducers: {
    heroesFetchingError: state => {
      state.heroesLoadingStatus = 'error';
    },
    visibleData: (state, action) => {
      state.filteredHeroes = action.payload;
    },
    heroDeleted: (state, action) => {
      heroesAdapter.removeOne(state, action.payload);
    },
    addHero: (state, action) => {
      heroesAdapter.addOne(state, action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroes.pending, state => {
        state.heroesLoadingStatus = 'loading'
      })
      .addCase(fetchHeroes.fulfilled, (state, action) => {
        state.heroesLoadingStatus = 'idle';
        heroesAdapter.setAll(state, action.payload);
      })
      .addCase(fetchHeroes.rejected, state => {
        state.heroesLoadingStatus = 'error'
      })
      .addDefaultCase(() => {});
  }
});

const {actions, reducer} = heroesSlice;

export default reducer;

export const { selectAll } = heroesAdapter.getSelectors(state => state.heroes);

export const {
  heroesFetchingError,
  visibleData,
  heroDeleted,
  addHero
} = actions;