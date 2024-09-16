import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { COCKTAIL_BASE_URL } from "../config/apiConstants";
export const cocktailSlice = createApi({
  reducerPath: "cocktail",
  baseQuery: fetchBaseQuery({
    baseUrl: COCKTAIL_BASE_URL,
  }),
  endpoints: (builder) => ({
    fetchCocktails: builder.query({
      query: (searchQuery = "") => ({
        url: `${COCKTAIL_BASE_URL}search.php`,
        params: { s: searchQuery },
      }),
    }),

    fetchCocktailById: builder.query({
      query: (id) => ({
        url: `${COCKTAIL_BASE_URL}lookup.php`,
        params: { i: id },
      }),
    }),
    fetchRandomCocktail: builder.query({
      query: () => ({
        url: `${COCKTAIL_BASE_URL}random.php`,
      }),
    }),
    fetchCocktailCategories: builder.query({
      query: () => ({
        url: `${COCKTAIL_BASE_URL}list.php`,
        params: { c: "list" },
      }),
    }),
  }),
});

export const {
  useFetchCocktailsQuery,
  useFetchCocktailByIdQuery,
  useFetchRandomCocktailQuery,
  useFetchCocktailCategoriesQuery,
} = cocktailSlice;
