import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { COCKTAIL_BASE_URL } from "../config/apiConstants";

export const cocktailSlice = createApi({
  reducerPath: "cocktail",
  baseQuery: fetchBaseQuery({ baseUrl: COCKTAIL_BASE_URL }),
  tagTypes: [
    "Cocktail",
    "CocktailCategories",
    "CocktailAreas",
    "CocktailIngredients",
  ],
  endpoints: (builder) => ({
    fetchCocktails: builder.query({
      query: (searchQuery = "") => `search.php?s=${searchQuery}`,
      providesTags: (result) =>
        result?.drinks
          ? result.drinks.map(({ idDrink }) => ({
              type: "Cocktail",
              id: idDrink,
            }))
          : [],
    }),

    fetchCocktailById: builder.query({
      query: (id) => `lookup.php?i=${id}`,
      providesTags: (id) => [{ type: "Cocktail", id }],
    }),
    fetchRandomCocktail: builder.query({
      query: () => `random.php`,
    }),
    fetchCocktailCategories: builder.query({
      query: () => `list.php?c=list`,
      providesTags: ["CocktailCategories"],
      keepUnusedDataFor: 60,
    }),
    fetchCocktailAreas: builder.query({
      query: () => `list.php?a=list`,
      providesTags: ["CocktailAreas"],
      keepUnusedDataFor: 60,
    }),
    fetchCocktailIngredients: builder.query({
      query: () => "list.php?i=list",
      providesTags: ["CocktailIngredients"],
      keepUnusedDataFor: 60,
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
