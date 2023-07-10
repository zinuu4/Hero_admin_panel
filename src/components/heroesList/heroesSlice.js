import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {useHttp} from '../../hooks/http.hook';

const initialState = {
  heroes: [],
  filteredHeroes: [],
  heroesLoadingStatus: 'idle',
}

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
      state.heroes = state.heroes.filter(item => item.id !== action.payload);
    },
    addHero: (state, action) => {
      state.heroes = [...state.heroes, action.payload];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroes.pending, state => {
        state.heroesLoadingStatus = 'loading'
      })
      .addCase(fetchHeroes.fulfilled, (state, action) => {
        state.heroesLoadingStatus = 'idle';
        state.heroes = action.payload;
      })
      .addCase(fetchHeroes.rejected, state => {
        state.heroesLoadingStatus = 'error'
      })
      .addDefaultCase(() => {});
  }
});

const {actions, reducer} = heroesSlice;

export default reducer;
export const {
  heroesFetchingError,
  visibleData,
  heroDeleted,
  addHero
} = actions;