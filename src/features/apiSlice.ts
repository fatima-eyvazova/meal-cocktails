import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.themealdb.com/api/json/v1/1/",
  }),
  endpoints: (builder) => ({
    fetchMeals: builder.query({
      query: ({ searchQuery = "", page = 1, limit = 10 }) =>
        `search.php?s=${searchQuery}&page=${page}&limit=${limit}`,
    }),
    fetchCocktails: builder.query({
      query: ({ searchQuery = "", page = 1, limit = 10 }) => ({
        url: "https://www.thecocktaildb.com/api/json/v1/1/search.php",
        params: { s: searchQuery, page, limit },
      }),
    }),
    fetchMealById: builder.query({
      query: (id) => `lookup.php?i=${id}`,
    }),
    fetchCocktailById: builder.query({
      query: (id) => ({
        url: `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
      }),
    }),
  }),
});

export const {
  useFetchMealsQuery,
  useFetchCocktailsQuery,
  useFetchMealByIdQuery,
  useFetchCocktailByIdQuery,
} = apiSlice;
