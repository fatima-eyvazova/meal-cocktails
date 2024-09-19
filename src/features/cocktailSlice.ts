import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { COCKTAIL_BASE_URL } from "../config/apiConstants";

export const cocktailSlice = createApi({
  reducerPath: "cocktail",
  baseQuery: fetchBaseQuery({ baseUrl: COCKTAIL_BASE_URL }),
  endpoints: (builder) => ({
    fetchCocktails: builder.query({
      query: (searchQuery = "") => `search.php?s=${searchQuery}`,
    }),
    fetchCocktailById: builder.query({
      query: (id) => `lookup.php?i=${id}`,
    }),
    fetchRandomCocktail: builder.query({
      query: () => `random.php`,
    }),
    fetchCocktailCategories: builder.query({
      query: () => `list.php?c=list`,
    }),
    fetchCocktailAreas: builder.query({
      query: () => `list.php?a=list`,
    }),
    fetchCocktailIngredients: builder.query({
      query: () => "list.php?i=list",
    }),
  }),
});

export const {
  useFetchCocktailsQuery,
  useFetchCocktailByIdQuery,
  useFetchRandomCocktailQuery,
  useFetchCocktailCategoriesQuery,
  useFetchCocktailAreasQuery,
  useFetchCocktailIngredientsQuery,
} = cocktailSlice;
