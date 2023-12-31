import { configureStore } from "@reduxjs/toolkit";
import filters from "../components/heroesFilters/filtersSlice";
import { apiSlice } from "../api/apiSlice";

const stringMiddleware = () => (next: any) => (action: any) => {
  if (typeof action === "string") {
    return next({
      type: action,
    });
  }
  return next(action);
};

const store = configureStore({
  reducer: { filters, [apiSlice.reducerPath]: apiSlice.reducer },
  middleware: (GetDefaultMiddleware) =>
    GetDefaultMiddleware().concat(stringMiddleware, apiSlice.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
