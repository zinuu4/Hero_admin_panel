import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Hero, Filter } from "../types/types";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  tagTypes: ["Heroes"],
  endpoints: (builder) => ({
    getHeroes: builder.query<Hero[], void>({
      query: () => "/heroes",
      providesTags: ["Heroes"],
    }),
    createHero: builder.mutation<Hero, Hero>({
      query: (hero) => ({
        url: "/heroes",
        method: "POST",
        body: hero,
      }),
      invalidatesTags: ["Heroes"],
    }),
    deleteHero: builder.mutation<void, string | number>({
      query: (id) => ({
        url: `/heroes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Heroes"],
    }),
    getFilters: builder.query<Filter[], void>({
      query: () => "/filters",
    }),
  }),
});

export const {
  useGetHeroesQuery,
  useCreateHeroMutation,
  useDeleteHeroMutation,
  useGetFiltersQuery,
} = apiSlice;
